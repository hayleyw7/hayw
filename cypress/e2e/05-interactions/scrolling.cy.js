describe('scroll behavior', () => {
  beforeEach(() => cy.visitHome())

  it('starts at the top of the page', () => {
    cy.window().its('scrollY').should('eq', 0)
    cy.get('#header').should('be.visible')
  })

  it('Embark prevents the default jump and requests a smooth scroll', () => {
    cy.get('#one-two-b').then(($target) => {
      cy.stub($target[0], 'scrollIntoView').as('scrollIntoView')
    })
    cy.get('.embark-btn').click()
    cy.get('@scrollIntoView').should('have.been.calledOnceWith', { behavior: 'smooth' })
    cy.location('hash').should('eq', '')
  })

  it('can scroll through each major section and reach the footer', () => {
    ;['#one-two-b', '#two', '#three', '#footer'].forEach((selector) => {
      cy.get(selector).scrollIntoView().should('be.visible')
    })
    cy.window().its('scrollY').should('be.greaterThan', 0)
  })

  it('restores a direct fragment URL to valid content', () => {
    cy.visit('/#three')
    cy.location('hash').should('eq', '#three')
    cy.get('#three').should('be.visible')
  })
})
