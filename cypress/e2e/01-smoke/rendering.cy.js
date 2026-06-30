describe('initial rendering', () => {
  it('renders every top-level region in document order', () => {
    cy.visitHome()

    cy.get('body > #root').should('exist')
    cy.get('#root').children().then(($children) => {
      expect([...$children].map((element) => element.tagName)).to.deep.equal([
        'HEADER',
        'MAIN',
        'FOOTER',
      ])
    })
    cy.get('header#header').should('be.visible')
    cy.get('main').should('be.visible')
    cy.get('footer#footer').should('be.visible')
  })

  it('does not render an error page, empty root, or accidental placeholder copy', () => {
    cy.visitHome()

    cy.get('#root').children().should('have.length', 3)
    cy.get('body').should('not.contain.text', 'undefined')
    cy.get('body').should('not.contain.text', '[object Object]')
    cy.get('body').should('not.contain.text', 'Lorem ipsum')
  })
})
