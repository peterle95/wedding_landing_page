import { devices } from '../support/viewports'

describe('Multi-Device Smoke Tests', () => {
    devices.forEach((device) => {
        context(`${device.name} (${device.width}x${device.height})`, () => {
            beforeEach(() => {
                cy.viewport(device.width, device.height)
                if (device.userAgent) {
                    // cy.visit('/', { headers: { 'User-Agent': device.userAgent } }) // Using headers on visit is one way, but setting it in config/before logic is harder in Cypress dynmically without a plugin or using Chrome Debugging Protocol. 
                    // However, we can simulate it partly or just rely on viewport which handles layout.
                    // For pure layout it's fine. If the app uses UA sniffing we need to use a cleaner approach.
                    // Simple approach:
                    // cy.visit happens inside tests.
                }
            })

            it('should load Home page and display critical elements', () => {
                // Pass user agent if needed
                const visitOptions = device.userAgent ? { headers: { 'User-Agent': device.userAgent } } : {}
                cy.visit('/', visitOptions)

                // Check Header
                cy.get('header').should('be.visible')

                // Check Main Content area availability
                cy.get('main').should('be.visible')

                // Check for "RSVP Now" button (might be hidden in menu on mobile depending on design, but usually a primary CTA is safe to check or check menu is present)
                // Adjusting selector for responsiveness if needed
                if (device.isMobile) {
                    // Maybe check for hamburger menu or mobile specific elements if known
                    // cy.get('[aria-label="Menu"]').should('exist') // Example
                } else {
                    // cy.contains('RSVP Now').should('be.visible')
                }

                // Universal check: "RSVP" button or link should exist somewhere
                cy.contains('RSVP').should('exist')
            })

            it('should load Gallery page', () => {
                const visitOptions = device.userAgent ? { headers: { 'User-Agent': device.userAgent } } : {}
                cy.visit('/gallery', visitOptions)

                // Title is "Our Moments" in English
                cy.contains('h1', 'Our Moments', { timeout: 10000 }).should('be.visible')
            })

            it('should load RSVP page', () => {
                const visitOptions = device.userAgent ? { headers: { 'User-Agent': device.userAgent } } : {}
                cy.visit('/rsvp', visitOptions)

                cy.contains('h1', 'Will You Be There?').should('exist') // From previous exploration

                // Form interactions are expensive, maybe just check inputs exist
                cy.get('button[role="combobox"]').should('exist')
            })
        })
    })
})
