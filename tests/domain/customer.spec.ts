import { describe, it, expect } from "vitest";
import Customer from "../../src/domain/customer";

const testId: number = 237;

describe("Customer Class", () => {
  it("should initialize with correct id", () => {
    const customer = new Customer(testId);
    expect(customer.Id).toBe(testId);
  });

  it("should initialize plastic, glass, and metal to zero.", () => {
    const customer = new Customer(testId);
    expect(customer["plastic"]).toBe(0);
    expect(customer["glass"]).toBe(0);
    expect(customer["metal"]).toBe(0);
  });

  it("should initialize plastic, glass, and metal to specific values.", () => {
    const customer = new Customer(testId, 1, 2, 3);
    expect(customer["plastic"]).toBe(1);
    expect(customer["glass"]).toBe(2);
    expect(customer["metal"]).toBe(3);
  });

  it("should initialize random amount of plastic, glass, and metal bottles.", () => {
    const customer = new Customer(testId);
    customer.SetRandomNumberOfBottles();
    expect(customer["plastic"]).toBeGreaterThan(0);
    expect(customer["glass"]).toBeGreaterThan(0);
    expect(customer["metal"]).toBeGreaterThan(0);
  });

  it("get some bottles.", () => {
    const customer = new Customer(testId, 5, 10, 15);
    expect(customer["plastic"]).toBe(5);
    expect(customer["glass"]).toBe(10);
    expect(customer["metal"]).toBe(15);
    expect(customer.TotalBottles).toBe(30);
    customer.GetNextBottle();
    expect(customer.TotalBottles).toBe(29);
  });
});
