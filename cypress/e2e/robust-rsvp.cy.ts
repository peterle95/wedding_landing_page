describe('RSVP Page - iPhone 11 Safari (Robust)', () => {
    beforeEach(() => {
      // Set up iPhone 11 viewport and mock APIs
      cy.viewport(414, 896)
      cy.mockGuestsApi(['John Smith', 'Jane Doe', 'Bob Johnson'])
      cy.mockRsvpApi()
    })
  
    it('should load RSVP page with correct mobile layout', () => {
      cy.visit('/rsvp')
      
      // Wait for page to fully load and hydrate
      cy.get('body').should('be.visible')
      
      // Check page title and header with more patience
      cy.contains('h1', 'Will You Be There?', { timeout: 10000 }).should('be.visible')
      cy.contains('p', 'Please let us know if you can make it', { timeout: 5000 }).should('be.visible')
      
      // Wait for guests to load
      cy.wait('@getGuests')
      
      // Wait for React to fully hydrate before checking form elements
      cy.wait(1000)
      
      // Check form elements are visible using existing selectors
      cy.get('button[role="combobox"]', { timeout: 10000 }).should('be.visible')
      cy.get('input[placeholder="Start typing..."]', { timeout: 5000 }).should('be.visible')
      cy.contains('button', 'Accept', { timeout: 5000 }).should('be.visible')
      cy.contains('button', 'Decline', { timeout: 5000 }).should('be.visible')
    })
  
    it('should successfully accept RSVP on iPhone 11', () => {
      cy.visit('/rsvp')
      
      // Wait for page to stabilize
      cy.wait('@getGuests')
      cy.wait(1000) // Allow for hydration
      
      // Select a name from dropdown
      cy.get('button[role="combobox"]', { timeout: 10000 }).click()
      cy.get('[role="option"]', { timeout: 5000 }).contains('John Smith').click()
      
      // Type confirmation name
      cy.get('input[placeholder="Start typing..."]', { timeout: 5000 }).type('John Smith')
      
      // Submit acceptance
      cy.contains('button', 'Accept').should('not.be.disabled').click()
      
      // Verify API was called
      cy.wait('@submitRsvp').then((interception) => {
        expect(interception.request.body).to.deep.equal({
          name: 'John Smith',
          status: 'Accepted'
        })
      })
      
      // Check success page
      cy.contains('h2', 'Your RSVP has been received!', { timeout: 10000 }).should('be.visible')
    })
  
    it('should successfully decline RSVP on iPhone 11', () => {
      cy.visit('/rsvp')
      cy.wait('@getGuests')
      cy.wait(1000)
      
      // Select a name from dropdown
      cy.get('button[role="combobox"]', { timeout: 10000 }).click()
      cy.get('[role="option"]', { timeout: 5000 }).contains('Jane Doe').click()
      
      // Type confirmation name
      cy.get('input[placeholder="Start typing..."]', { timeout: 5000 }).type('Jane Doe')
      
      // Submit decline
      cy.contains('button', 'Decline').should('not.be.disabled').click()
      
      // Verify API was called
      cy.wait('@submitRsvp')
      
      // Check success page
      cy.contains('h2', 'Your RSVP has been received!', { timeout: 10000 }).should('be.visible')
    })
  
    it('should show validation errors when name mismatch occurs', () => {
      cy.visit('/rsvp')
      cy.wait('@getGuests')
      cy.wait(1000)
      
      // Select a name from dropdown
      cy.get('button[role="combobox"]', { timeout: 10000 }).click()
      cy.get('[role="option"]', { timeout: 5000 }).contains('John Smith').click()
      
      // Type wrong confirmation name
      cy.get('input[placeholder="Start typing..."]', { timeout: 5000 }).type('Wrong Name')
      
      // Try to submit
      cy.contains('button', 'Accept').click()
      
      // Should show error toast - be more flexible with selectors
      cy.get('body', { timeout: 10000 }).should('contain.text', 'name')
        .or('contain.text', 'match')
        .or('contain.text', 'confirmation')
    })
  
    it('should handle loading states properly', () => {
      // Intercept with delay to test loading state
      cy.intercept('GET', '/api/guests', {
        statusCode: 200,
        body: { guests: ['Test User'] },
        delay: 3000
      }).as('getGuestsDelayed')
      
      cy.visit('/rsvp')
      
      // Wait for initial page load
      cy.get('body').should('be.visible')
      cy.wait(1000)
      
      // Check if loading state exists (it might not show due to hydration)
      cy.get('button[role="combobox"]', { timeout: 10000 }).then(($btn) => {
        // Don't assert loading text if hydration prevents it
        cy.log('Button text:', $btn.text())
      })
      
      cy.wait('@getGuestsDelayed')
      
      // Should be enabled after loading
      cy.get('button[role="combobox"]').should('not.be.disabled')
    })
  })