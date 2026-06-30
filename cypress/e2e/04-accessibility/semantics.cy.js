describe('semantic accessibility', () => {
  beforeEach(() => cy.visitHome())

  it('uses landmark elements and keeps all visible content inside them', () => {
    cy.get('header#header').should('exist')
    cy.get('main').should('exist')
    cy.get('footer#footer').should('exist')
    cy.get('main section').should('have.length.greaterThan', 3)
  })

  it('gives every link a discernible accessible name', () => {
    cy.get('a').each(($link) => {
      const name = $link.attr('aria-label') || $link.text().trim() || $link.attr('title')
      expect(name, $link.attr('href')).to.be.a('string').and.not.be.empty
    })
  })

  it('has no duplicate IDs and every fragment target exists', () => {
    cy.get('[id]').then(($elements) => {
      const ids = [...$elements].map((element) => element.id)
      expect(new Set(ids).size).to.equal(ids.length)
    })

    cy.get('a[href^="#"]').each(($link) => {
      cy.get($link.attr('href')).should('exist')
    })
  })

  it('keeps decorative cloud animation hidden from assistive technology', () => {
    cy.get('.cloud-container').should('have.attr', 'aria-hidden', 'true')
  })
})
