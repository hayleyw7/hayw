describe('desktop layout', () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
    cy.visitHome()
  })

  it('uses two columns for the introduction and impact areas', () => {
    cy.get('.main-content-container').then(($column) => {
      expect($column[0].getBoundingClientRect().width).to.be.closeTo(
        $column[0].parentElement.getBoundingClientRect().width / 2,
        2,
      )
    })
    cy.get('.major-icons-container').then(($column) => {
      expect($column[0].getBoundingClientRect().width).to.be.closeTo(
        $column[0].parentElement.getBoundingClientRect().width / 2,
        2,
      )
    })
  })

  it('shows the complete tagline and right-aligns the portrait column', () => {
    cy.get('.tagline-detail').should('be.visible')
    cy.get('.avatar-container').should('have.css', 'justify-content', 'flex-end')
  })

  it('has no horizontal page overflow', () => cy.assertNoHorizontalOverflow())
})
