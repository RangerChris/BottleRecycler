# Bottle Recycler - AI Coding Guide

## Architecture Overview

This is a React-based game simulation where players manage bottle recycling machines. The architecture follows a component-driven design with domain models and real-time game loop mechanics.

### Key Components Structure
- **Manager** (`src/components/managerComponent.tsx`) - Game controller managing money, recyclers, and timer
- **Recycler** (`src/components/recyclerComponent.tsx`) - Individual recycling machine with state management
- **Domain Models** (`src/domain/`) - `Customer`, `Bottle` with TypeScript enums for bottle types

### Game Loop Pattern
The app uses multiple `setInterval` loops running at different frequencies:
- Main app loop: 1000ms (placeholder in `App.tsx`)
- Manager timer: 1000ms for countdown and goal tracking
- Recycler processing: 400ms for customer/bottle processing

## Development Workflows

### Build & Run Commands
```bash
npm run dev              # Development server (Vite)
npm run dev:coverage     # Dev server with coverage instrumentation
npm run build            # Production build (includes server compilation)
npm run preview          # Preview production build
```

### Testing Strategy

**Testing Frameworks:**
- Only [Playwright](https://playwright.dev/) (E2E/UI) and [Vitest](https://vitest.dev/) (unit/component) are used for all tests. Jest and other runners are NOT used.

**E2E Testing:** Playwright with coverage collection
**Unit/Component Testing:** Vitest with Testing Library
**Coverage:** Custom merge script combines Playwright and Vitest coverage reports

**Key Commands:**
```bash
npm run test                # Playwright UI
npm run test:coverage       # Playwright headless with coverage
npm run vitest:coverage     # Vitest coverage
npm run vitest:coverage:open # Open Vitest coverage report
npm run coverage            # Full coverage workflow (server + test + merge)
```

### Deployment
- **GitHub Pages**: Automated deployment via `gh-pages` package
- **Server**: Express.js with rate limiting for production hosting
- **Base Path**: `/BottleRecycler/` configured in Vite for GitHub Pages

## Project-Specific Patterns

### State Management
- Pure React hooks (no external state library)
- Component state lifting pattern between Manager and Recycler
- Real-time updates via callback props (`onSale` pattern)

### Game Logic Conventions
- **State Enums**: Use TypeScript enums for game states (`recyclerState`, `BottleType`)
- **Probability Logic**: Random events (jams) calculated per loop iteration
- **Capacity Management**: Hard limits (100 bottles) with overflow handling

### Material-UI Integration
- Consistent use of MUI components (`Card`, `Button`, `AppBar`)
- Tooltip patterns for showing costs/prices
- Stack layouts for responsive design

### File Organization
- Components in `src/components/` with descriptive names ending in "Component"
- Domain models in `src/domain/` as classes with getters/setters
- Tests mirror source structure (`tests/domain/`, `tests/e2e-`)

## Critical Integration Points

### Coverage Collection
- Vite plugin configuration switches based on mode (`coverage` vs `dev`)
- Custom merge script (`scripts/merge-coverage.js`) handles multiple coverage files
- Playwright collects runtime coverage through instrumented code

### Build Process
- TypeScript compilation for both client (`tsc -b`) and server (`tsc server.ts`)
- Vite handles client bundling with React plugin
- Server builds to `dist/` directory for deployment

### Configuration Files
- `vite.config.ts`: Mode-dependent Istanbul plugin loading
- `playwright.config.ts`: Single browser config (Chrome only)
- Base URL and path configurations for GitHub Pages deployment

## Testing Patterns

### Playwright Structure
- Custom test fixture (`playwright-coverage.ts`) extends base Playwright
- Page object patterns using `getByRole` and accessibility selectors
- Coverage collection integrated into test lifecycle

### Test Data
- Use realistic game scenarios (buying recyclers, starting machines)
- Focus on user workflows rather than unit testing individual functions
- Validate UI state changes and text content expectations