import '@testing-library/jest-dom';

// Silence random Math.random based flakiness by seeding via mock if needed in tests.
// Individual tests can spyOn(Math, 'random') for deterministic flows.
