describe('RSVP Page - iPhone 11 Safari', () => {
    beforeEach(() => {
      // Set up iPhone 11 viewport and mock APIs
      cy.viewport(414, 896)
      cy.mockGuestsApi(['John Smith', 'Jane Doe', 'Bob Johnson'])
      cy.mockRsvpApi()
    })
  
    it('should load RSVP page with correct mobile layout', () => {
      cy.visit('/rsvp')
      
      // Check page title and header
      cy.contains('h1', 'Will You Be There?').should('be.visible')
      cy.contains('p', 'Please let us know if you can make it by May 1st, 2026').should('be.visible')
      
      // Wait for guests to load
      cy.wait('@getGuests')
      
      // Check form elements are visible using existing selectors
      cy.get('button[role="combobox"]').should('be.visible')
      cy.get('input[placeholder="Start typing..."]').should('be.visible')
      cy.contains('button', 'Accept').should('be.visible')
      cy.contains('button', 'Decline').should('be.visible')
    })
  
    it('should successfully accept RSVP on iPhone 11', () => {
      cy.visit('/rsvp')
      cy.wait('@getGuests')
      
      // Select a name from dropdown
      cy.get('button[role="combobox"]').click()
      cy.get('[role="option"]').contains('John Smith').click()
      
      // Type confirmation name
      cy.get('input[placeholder="Start typing..."]').type('John Smith')
      
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
      cy.contains('h2', 'Your RSVP has been received!').should('be.visible')
      cy.contains('p', "We're so excited to celebrate with you").should('be.visible')
    })
  
    it('should successfully decline RSVP on iPhone 11', () => {
      cy.visit('/rsvp')
      cy.wait('@getGuests')
      
      // Select a name from dropdown
      cy.get('button[role="combobox"]').click()
      cy.get('[role="option"]').contains('Jane Doe').click()
      
      // Type confirmation name
      cy.get('input[placeholder="Start typing..."]').type('Jane Doe')
      
      // Submit decline
      cy.contains('button', 'Decline').should('not.be.disabled').click()
      
      // Verify API was called
      cy.wait('@submitRsvp').then((interception) => {
        expect(interception.request.body).to.deep.equal({
          name: 'Jane Doe',
          status: 'Declined'
        })
      })
      
      // Check success page
      cy.contains('h2', 'Your RSVP has been received!').should('be.visible')
    })
  
    it('should show validation errors when name mismatch occurs', () => {
      cy.visit('/rsvp')
      cy.wait('@getGuests')
      
      // Select a name from dropdown
      cy.get('button[role="combobox"]').click()
      cy.get('[role="option"]').contains('John Smith').click()
      
      // Type wrong confirmation name
      cy.get('input[placeholder="Start typing..."]').type('Wrong Name')
      
      // Try to submit
      cy.contains('button', 'Accept').click()
      
      // Should show error toast (using a more flexible selector)
      cy.get('body').should('contain.text', 'Name confirmation')
    })
  
    it('should handle API errors gracefully on iPhone 11', () => {
      cy.mockRsvpApi(true) // Mock API to fail
      cy.visit('/rsvp')
      cy.wait('@getGuests')
      
      // Fill form correctly
      cy.get('button[role="combobox"]').click()
      cy.get('[role="option"]').contains('Bob Johnson').click()
      cy.get('input[placeholder="Start typing..."]').type('Bob Johnson')
      
      // Submit and expect error
      cy.contains('button', 'Accept').click()
      cy.wait('@submitRsvp')
      
      // Should show error toast
      cy.get('body').should('contain.text', 'Error')
    })
  
    it('should handle loading states properly', () => {
      // Intercept with delay to test loading state
      cy.intercept('GET', '/api/guests', {
        statusCode: 200,
        body: { guests: ['Test User'] },
        delay: 2000
      }).as('getGuestsDelayed')
      
      cy.visit('/rsvp')
      
      // Should show loading state
      cy.get('button[role="combobox"]').should('contain.text', 'Loading...')
      cy.get('button[role="combobox"]').should('be.disabled')
      
      cy.wait('@getGuestsDelayed')
      
      // Should be enabled after loading
      cy.get('button[role="combobox"]').should('not.be.disabled')
      cy.get('button[role="combobox"]').should('contain.text', 'Choose your name')
    })
  
    it('should work with touch interactions on iPhone 11', () => {
      cy.visit('/rsvp')
      cy.wait('@getGuests')
      
      // Test touch interaction for dropdown
      cy.get('button[role="combobox"]').trigger('touchstart').trigger('touchend')
      cy.get('[role="option"]').first().trigger('touchstart').trigger('touchend')
      
      // Test touch interaction for input
      cy.get('input[placeholder="Start typing..."]')
        .trigger('touchstart')
        .trigger('touchend')
        .type('John Smith')
      
      // Test touch interaction for button
      cy.contains('button', 'Accept')
        .trigger('touchstart')
        .trigger('touchend')
        .click()
      
      cy.wait('@submitRsvp')
      cy.contains('h2', 'Your RSVP has been received!').should('be.visible')
    })
  
    it('should maintain form state during orientation changes', () => {
      cy.visit('/rsvp')
      cy.wait('@getGuests')
      
      // Fill partial form
      cy.get('button[role="combobox"]').click()
      cy.get('[role="option"]').contains('John Smith').click()
      cy.get('input[placeholder="Start typing..."]').type('John')
      
      // Simulate landscape orientation
      cy.viewport(896, 414)
      
      // Form should maintain state
      cy.get('button[role="combobox"]').should('contain.text', 'John Smith')
      cy.get('input[placeholder="Start typing..."]').should('have.value', 'John')
      
      // Complete the form
      cy.get('input[placeholder="Start typing..."]').clear().type('John Smith')
      cy.contains('button', 'Accept').click()
      
      cy.wait('@submitRsvp')
      cy.contains('h2', 'Your RSVP has been received!').should('be.visible')
    })
  })