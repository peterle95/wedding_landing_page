describe('Navigation Stress Test', () => {
    // Stress tests can be flaky if the app is slow, so we set a higher timeout
    const pages = ['/', '/gallery', '/location', '/rsvp']

    it('should handle rapid navigation between pages without crashing', () => {
        // Perform 20 random internal navigations
        for (let i = 0; i < 20; i++) {
            const randomPage = pages[Math.floor(Math.random() * pages.length)]
            cy.visit(randomPage)
            cy.get('body').should('be.visible')
            // Minimal wait to ensure we don't just cancel requests immediately (unless that's the goal)
            // Ideally we wait for at least one paint or key element
            cy.get('h1, h2').should('exist')
        }
    })

    it('should withstand rapid tab switching (simulated)', () => {
        // Can't switch tabs in Cypress, but we can simulate rapid state changes or component mounting/unmounting
        // by visiting pages quickly.

        cy.visit('/')
        cy.get('header').should('be.visible')

        pages.forEach((page) => {
            cy.visit(page)
            cy.wait(100) // Very short wait, aggressively moving on
        })
    })

    it('should handle form input stress', () => {
        cy.visit('/rsvp')
        cy.get('button[role="combobox"]').click()

        // Rapidly filter the list if possible, or just open/close
        for (let i = 0; i < 10; i++) {
            cy.get('button[role="combobox"]').click({ force: true }) // Toggle open/close
            cy.wait(50)
        }

        // Ensure it's still functional
        cy.get('button[role="combobox"]').should('exist').and('not.be.disabled')
    })
})
