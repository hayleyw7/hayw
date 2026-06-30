describe('scroll behavior', () => {
  beforeEach(() => cy.visitHome())

  it('starts at the top of the page', () => {
    cy.window().its('scrollY').should('eq', 0)
    cy.get('#header').should('be.visible')
  })

  it('Embark prevents the default jump and requests a smooth scroll', () => {
    cy.get('#intro').then(($target) => {
      cy.stub($target[0], 'scrollIntoView').as('scrollIntoView')
    })
    cy.get('.embark-btn').click()
    cy.get('@scrollIntoView').should('have.been.calledOnceWith', { behavior: 'smooth' })
    cy.location('hash').should('eq', '')
  })

  it('can scroll through each major section and reach the footer', () => {
    ;['#intro', '#impact', '#projects', '#recognition', '#footer'].forEach((selector) => {
      cy.get(selector).scrollIntoView().should('be.visible')
    })
    cy.window().its('scrollY').should('be.greaterThan', 0)
  })

  it('restores a direct fragment URL to valid content', () => {
    cy.visit('/#recognition')
    cy.location('hash').should('eq', '#recognition')
    cy.get('#recognition').should('be.visible')
  })
})
