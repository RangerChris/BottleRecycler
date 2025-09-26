import '@testing-library/jest-dom';

// Vitest-specific test setup goes here. Keeping jest-dom in a vitest-only setup file
// prevents Playwright test runner from importing it and causing symbol redefinition
// when both Playwright and Vitest expect are present.
