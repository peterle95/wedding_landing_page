// Import commands.js using ES2015 syntax:
import './commands'

// Handle uncaught exceptions globally
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore Next.js hydration and development errors
  if (
    err.message.includes('Hydration failed') ||
    err.message.includes('Minified React error') ||
    err.message.includes('ResizeObserver loop limit exceeded') ||
    err.message.includes('Non-Error promise rejection captured') ||
    err.message.includes('__nextjs_original-stack-frames')
  ) {
    return false
  }
  // Let other errors fail the test
  return true
})

// Hide fetch/XHR requests from command log for cleaner output
Cypress.on('window:before:load', (win) => {
  cy.stub(win.console, 'error').as('consoleError')
})