# Wedding Website Testing Guide

This document provides a comprehensive testing strategy to ensure your wedding website works flawlessly across all devices and platforms.

## Table of Contents
1. [Testing Setup](#testing-setup)
2. [Unit Testing](#unit-testing)
3. [Component Testing](#component-testing)
4. [End-to-End Testing](#end-to-end-testing)
5. [Cross-Browser Testing](#cross-browser-testing)
6. [Performance Testing](#performance-testing)
7. [Accessibility Testing](#accessibility-testing)
8. [Manual Testing Checklist](#manual-testing-checklist)
9. [Monitoring & Error Tracking](#monitoring--error-tracking)

## Testing Setup

### 1. Install Dependencies

```bash
# Install Jest and Testing Library
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom

# Install Cypress for E2E testing
npm install --save-dev cypress @cypress/react @cypress/webpack-dev-server

# Install additional utilities
npm install --save-dev msw whatwg-fetch @testing-library/dom
```

### 2. Configure Jest

Create `jest.config.js` in your project root:

```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
}

module.exports = createJestConfig(customJestConfig)
```

### 3. Create Test Setup File

Create `jest.setup.js` in your project root:

```javascript
// jest.setup.js
import '@testing-library/jest-dom'
import 'whatwg-fetch'

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
    }
  },
}))
```

## Unit Testing

### 1. Testing Utility Functions

Create `src/lib/__tests__/utils.test.ts`:

```typescript
import { weddingDate } from '../constants'

describe('Utility Functions', () => {
  describe('Date Parsing', () => {
    it('should parse wedding date correctly', () => {
      const date = new Date(weddingDate)
      expect(date.getFullYear()).toBe(2026)
      expect(date.getMonth()).toBe(5) // June (0-indexed)
      expect(date.getDate()).toBe(27)
    })
  })
})
```

### 2. Testing API Routes

Create `src/app/api/__tests__/rsvp.test.ts`:

```typescript
import { POST } from '../rsvp/route'
import { NextRequest } from 'next/server'

describe('RSVP API', () => {
  it('should handle valid RSVP submission', async () => {
    const req = new NextRequest('http://localhost/api/rsvp', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        status: 'Accepted'
      })
    })
    
    const response = await POST(req)
    expect(response.status).toBe(200)
  })
})
```

## Component Testing

### 1. Testing CountdownTimer

Create `src/components/__tests__/CountdownTimer.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { CountdownTimer } from '../CountdownTimer'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
    }
  },
}))

describe('CountdownTimer', () => {
  it('renders countdown timer', () => {
    render(<CountdownTimer />)
    expect(screen.getByText('Countdown to the Big Day!')).toBeInTheDocument()
  })
})
```

## End-to-End Testing with Cypress

### 1. Initialize Cypress

```bash
npx cypress open
```

### 2. Create Test Files

Create `cypress/e2e/rsvp.cy.js`:

```javascript
describe('RSVP Flow', () => {
  it('should complete RSVP form', () => {
    cy.visit('/rsvp')
    cy.get('select').select('Test Guest')
    cy.get('input[name="confirmName"]').type('Test Guest')
    cy.contains('Accept').click()
    cy.contains('Thank you').should('be.visible')
  })
})
```

## Cross-Browser Testing

### 1. BrowserStack Integration

1. Sign up for BrowserStack
2. Install BrowserStack CLI:
   ```bash
   npm install -g browserstack-cypress-cli
   ```
3. Run tests:
   ```bash
   npx cypress run --browser chrome --headless
   npx cypress run --browser firefox --headless
   npx cypress run --browser edge --headless
   ```

## Performance Testing

### 1. Lighthouse CI

1. Install Lighthouse CI:
   ```bash
   npm install -g @lhci/cli
   ```

2. Run performance tests:
   ```bash
   lhci autorun --collect.url=https://your-wedding-site.com
   ```

## Accessibility Testing

### 1. Axe Testing

Add to your Cypress setup:

```javascript
// cypress/support/e2e.js
import 'cypress-axe'
import './commands'

// Add a11y tests to every page
beforeEach(() => {
  cy.injectAxe()
  cy.checkA11y()
})
```

## Manual Testing Checklist

### 1. Device Testing
- [ ] iPhone (latest iOS)
- [ ] iPad
- [ ] Android phone
- [ ] Android tablet
- [ ] Windows desktop
- [ ] Mac desktop

### 2. Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Chrome for Android

### 3. Critical Paths
- [ ] Homepage loads
- [ ] RSVP form submission
- [ ] Navigation between pages
- [ ] Image loading
- [ ] Form validation

## Monitoring & Error Tracking

### 1. Add Sentry

1. Install Sentry:
   ```bash
   npm install --save @sentry/nextjs
   ```

2. Configure in `sentry.client.config.js`:
   ```javascript
   import * as Sentry from "@sentry/nextjs"

   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     tracesSampleRate: 1.0,
     environment: process.env.NODE_ENV,
   })
   ```

### 2. Google Analytics

Add to `_app.tsx`:

```typescript
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}
```

## Running Tests

### 1. Run Unit Tests
```bash
npm test
```

### 2. Run E2E Tests
```bash
npm run cypress:open  # Interactive mode
# or
npm run cypress:run   # Headless mode
```

### 3. Run All Tests
```bash
npm run test:all
```
Add to `package.json`:
```json
{
  "scripts": {
    "test:all": "npm test && npm run cypress:run"
  }
}
```

## Troubleshooting

### Common Issues
1. **Date Parsing**: Use ISO 8601 format with timezone (e.g., '2026-06-06T16:00:00Z')
2. **Polyfills**: Add necessary polyfills for older browsers
3. **Responsive Issues**: Test on actual devices, not just emulators
4. **CORS**: Ensure API endpoints handle CORS properly
5. **Environment Variables**: Verify all required .env variables are set

## Conclusion

This testing guide provides a comprehensive approach to ensure your wedding website works flawlessly across all devices and platforms. Regular testing and monitoring will help catch and fix issues before your guests encounter them.
