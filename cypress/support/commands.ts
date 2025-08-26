/// <reference types="cypress" />

declare global {
    namespace Cypress {
      interface Chainable {
        /**
         * Custom command to simulate iPhone 11 Safari environment
         */
        setupiPhone11Safari(): Chainable<void>
        
        /**
         * Custom command to mock the guests API
         */
        mockGuestsApi(guests?: string[]): Chainable<void>
        
        /**
         * Custom command to mock the RSVP API
         */
        mockRsvpApi(shouldFail?: boolean): Chainable<void>
      }
    }
  }
  
  Cypress.Commands.add('setupiPhone11Safari', () => {
    cy.viewport(414, 896)
    cy.visit('/', {
      onBeforeLoad(win) {
        // Override navigator properties to simulate iPhone 11
        Object.defineProperty(win.navigator, 'userAgent', {
          writable: false,
          value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1'
        })
        
        Object.defineProperty(win.navigator, 'platform', {
          writable: false,
          value: 'iPhone'
        })
      }
    })
  })
  
  Cypress.Commands.add('mockGuestsApi', (guests = ['John Smith', 'Jane Doe', 'Bob Johnson']) => {
    cy.intercept('GET', '/api/guests', {
      statusCode: 200,
      body: { guests }
    }).as('getGuests')
  })
  
  Cypress.Commands.add('mockRsvpApi', (shouldFail = false) => {
    cy.intercept('POST', '/api/rsvp', (req) => {
      if (shouldFail) {
        req.reply({
          statusCode: 500,
          body: { error: 'Server error' }
        })
      } else {
        req.reply({
          statusCode: 200,
          body: { ok: true }
        })
      }
    }).as('submitRsvp')
  })
  
  export {}