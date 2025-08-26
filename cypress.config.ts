import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9002',
    setupNodeEvents(on, config) {
      // Only handle Node events here, not browser events
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
  },
  viewportWidth: 414,
  viewportHeight: 896,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1',
  chromeWebSecurity: false,
  // Add video and screenshot settings
  video: true,
  screenshotOnRunFailure: true,
})