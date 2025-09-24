import { render, screen, fireEvent } from '@testing-library/react';
import RecyclerComponent from '../../src/components/recyclerComponent';
import * as React from 'react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { act } from 'react';
import Customer from '../../src/domain/customer';

// Helper to advance fake timers wrapped in React act
async function advance(ms: number) {
  await act(async () => {
    vi.advanceTimersByTime(ms);
  });
}

describe('RecyclerComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders with initial stopped state and Start button', () => {
    const onSale = vi.fn();
    render(<RecyclerComponent id={1} onSale={onSale} />);
    expect(screen.getByText(/Recycler 1/)).toBeInTheDocument();
    expect(screen.getByText(/Status/i).nextSibling?.textContent).toContain('Stopped');
    expect(screen.getByRole('button', { name: /Start/i })).toBeEnabled();
  });

  it('transitions to Running when Start clicked', () => {
    const onSale = vi.fn();
    render(<RecyclerComponent id={2} onSale={onSale} />);
    const startBtn = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startBtn);
    expect(screen.getByRole('button', { name: /Stop/i })).toBeInTheDocument();
  });

  it('processes existing queued customer bottles over intervals', async () => {
    const onSale = vi.fn();
    const initialCustomer = new Customer(1, 3, 0, 0); // 3 plastic bottles
    render(
      <RecyclerComponent
        id={3}
        onSale={onSale}
        testOverrides={{
          autoGenerateCustomers: false,
          initialQueue: [initialCustomer],
          intervalMs: 10,
          randomFn: () => 0.5,
        }}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Start/i }));

    expect(extractCount('Plastic')).toBe(0);
    await advance(50); // enough loops to process at least one bottle
    expect(extractCount('Plastic')).toBeGreaterThan(0);
  });

  it('empties bottles and calls onSale with correct value', async () => {
    const onSale = vi.fn();
    const randomFn = () => 0.01; // always create customers, no jam (<1% jam chance rarely triggered due to same value)
    render(
      <RecyclerComponent
        id={4}
        onSale={onSale}
        testOverrides={{ randomFn, intervalMs: 10 }}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Start/i }));
  await advance(120); // enough loops at 10ms

    // Capture counts
    const glassCount = extractCount('Glass');
    const plasticCount = extractCount('Plastic');
    const metalCount = extractCount('Metal');

    const expectedSale = (glassCount + plasticCount + metalCount) * 2.95;

    // Accessible name overridden by aria-label, so select via visible text
    const emptyBtnText = screen.getByText('Empty');
    fireEvent.click(emptyBtnText.closest('button') ?? emptyBtnText);

    expect(onSale).toHaveBeenCalledTimes(1);
    expect(onSale).toHaveBeenCalledWith(expectedSale);

    // After empty, counts should reset to 0
    expect(extractCount('Glass')).toBe(0);
    expect(extractCount('Plastic')).toBe(0);
    expect(extractCount('Metal')).toBe(0);
  });

  it('handles jam (Error state) and Fix resets to Stopped', async () => {
    const onSale = vi.fn();
    const seq = [0.01, 0.5, 0.5, 0.009]; // create customer, safe, safe, jam
    const randomFn = () => seq.shift() ?? 0.5;

    render(
      <RecyclerComponent
        id={5}
        onSale={onSale}
        testOverrides={{ randomFn, intervalMs: 10 }}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Start/i }));

  await advance(80); // multiple fast loops

  // Status should show Error after jam trigger
  const statusNode = screen.getByText('Status').parentElement as HTMLElement;
  expect(statusNode.textContent).toContain('Error');

    // Click Fix
    fireEvent.click(screen.getByRole('button', { name: /Fix/i }));

    // After fix, state should be Stopped (button shows Start again after timers flush)
    await advance(100); // allow state update
    expect(screen.getByRole('button', { name: /Start/i })).toBeInTheDocument();
  });
});

function extractCount(label: string): number {
  const root = screen.getByText(label).parentElement as HTMLElement;
  const valueEl = root.querySelector('p');
  return valueEl ? parseInt(valueEl.textContent || '0', 10) : 0;
}
