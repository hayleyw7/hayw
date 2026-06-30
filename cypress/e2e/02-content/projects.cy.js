import { projects } from '../../fixtures/contracts.js'

describe('projects content', () => {
  beforeEach(() => cy.visitHome())

  it('renders the project groups and cards without omissions or duplicates', () => {
    cy.get('#projects .recognition-group').should('have.length', Object.keys(projects).length)

    Object.entries(projects).forEach(([group, cards]) => {
      cy.get('#projects .recognition-group').contains('h3', group).should('exist')
      cy.contains('#projects .recognition-group', group).within(() => {
        cy.get('article').should('have.length', cards.length)
        cy.get('h4').then(($headings) => {
          expect([...$headings].map((heading) => heading.textContent)).to.deep.equal(cards)
        })
      })
    })
  })

  it('pairs every project card with descriptive copy and one action', () => {
    cy.get('#projects .recognition-group article').should('have.length', 7).each(($article) => {
      cy.wrap($article).within(() => {
        cy.get('h4').invoke('text').should('not.be.empty')
        cy.get('p').invoke('text').should('have.length.greaterThan', 10)
        cy.get('a.button').should('have.length', 1).and('not.have.text', '')
      })
    })
  })
})
