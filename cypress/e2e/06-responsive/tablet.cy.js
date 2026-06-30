describe('tablet layout', () => {
  beforeEach(() => {
    cy.viewport(768, 1024)
    cy.visitHome()
  })

  it('stacks medium breakpoint columns and centers the portrait', () => {
    cy.get('.main-content-container').then(($column) => {
      expect($column[0].getBoundingClientRect().width).to.equal(
        $column[0].parentElement.getBoundingClientRect().width,
      )
    })
    cy.get('.imp-medium').then(($column) => {
      expect($column[0].getBoundingClientRect().width).to.equal(
        $column[0].parentElement.getBoundingClientRect().width,
      )
    })
    cy.get('.avatar-container').should('have.css', 'justify-content', 'center')
  })

  it('keeps recognition actions and copy visible', () => {
    cy.get('.recognition-group article').each(($article) => {
      cy.wrap($article).should('be.visible').find('.button').should('be.visible')
    })
  })

  it('has no horizontal page overflow', () => cy.assertNoHorizontalOverflow())
})
