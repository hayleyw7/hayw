import { impactHeadings } from '../../fixtures/contracts.js'

describe('impact content', () => {
  beforeEach(() => cy.visitHome())

  it('renders every impact area once', () => {
    cy.get('#impact h3').should('have.length', impactHeadings.length)
    cy.get('#impact h3').then(($headings) => {
      expect([...$headings].map((heading) => heading.textContent)).to.deep.equal(impactHeadings)
    })
    cy.get('#impact .col-6:last-child > div > p').should('have.length', impactHeadings.length)
  })

  it('keeps decorative iconography out of the accessibility tree', () => {
    cy.get('.major-icons-container').should('have.attr', 'aria-hidden', 'true')
    cy.get('.major-icons li').should('have.length', 6)
    cy.get('.major-icons .icon').each(($icon) => {
      cy.wrap($icon).should('have.attr', 'class').and('match', /fa-/)
    })
  })
})
