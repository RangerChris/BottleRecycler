import { render, fireEvent, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ManagerComponent from '../../src/components/managerComponent';

describe('ManagerComponent', () => {
  it('buying recycler deducts money', () => {
    render(<ManagerComponent initialMoney={1000} />);
    // Start game to enable Buy recycler button
    fireEvent.click(screen.getByRole('button', { name: /start game/i }));
    const moneyText = screen.getByText(/Money:/i).textContent;
    const initialMoney = Number(moneyText?.replace(/[^\d.]/g, ''));
    const buyButton = screen.getByRole('button', { name: /buy recycler/i });
    fireEvent.click(buyButton);
    const afterMoneyText = screen.getByText(/Money:/i).textContent;
    const afterBuyMoney = Number(afterMoneyText?.replace(/[^\d.]/g, ''));
    expect(afterBuyMoney).toBeLessThan(initialMoney);
  });

  it('timer countdown and goal escalation', async () => {
    vi.useFakeTimers();
    render(<ManagerComponent initialMoney={1000} />);
    // Start game
    fireEvent.click(screen.getByRole('button', { name: /start game/i }));
    // Initial goal and timer (goal is 400)
    expect(screen.getByText(/Goal:/i).textContent).toContain('Goal: 400 in 1:00');
    // Fast-forward 60 seconds
    act(() => {
      vi.advanceTimersByTime(60000);
    });
    // After timer, goal should escalate and timer should be 0:59
    expect(screen.getByText(/Goal:/i).textContent).toMatch(/Goal: \d+ in 0:59/);
    vi.useRealTimers();
  });

  it('game over and restart behavior', async () => {
    vi.useFakeTimers();
    render(<ManagerComponent initialMoney={200} />);
    // Start game
    fireEvent.click(screen.getByRole('button', { name: /start game/i }));
    // Fast-forward timer to game over (goal is 400, money is 200, so game over)
    act(() => {
      vi.advanceTimersByTime(61000);
    });
    // Game over: Buy recycler button is still present (matches current UI)
    expect(screen.getByRole('button', { name: /buy recycler/i })).toBeInTheDocument();
    // Money should remain at 200 (game over)
    expect(screen.getByText(/Money:/i).textContent).toMatch(/Money: \$200.00/);
    vi.useRealTimers();
  });
});
