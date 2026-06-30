import { recommendations } from '../../fixtures/contracts.js'

const recommendationCount = Object.values(recommendations).flat().length

describe('recommendations content', () => {
  beforeEach(() => cy.visitHome())

  it('renders the recommendation groups and quotes without omissions or duplicates', () => {
    cy.get('#recommendations .recognition-group').should('have.length', Object.keys(recommendations).length)

    Object.entries(recommendations).forEach(([group, titles]) => {
      cy.contains('#recommendations .recognition-group', group).within(() => {
        cy.get('article').should('have.length', titles.length)
        cy.get('.recommendation-quote').then(($quotes) => {
          titles.forEach((title, index) => {
            expect($quotes.eq(index).text()).to.include(`— ${title}`)
          })
        })
      })
    })
  })

  it('wraps each quote in quotation marks without blockquote styling', () => {
    cy.get('#recommendations .recommendation-quote').should('have.length', recommendationCount).each(($quote) => {
      cy.wrap($quote).invoke('text').should('match', /^".+" — .+$/)
      cy.wrap($quote).should('have.prop', 'tagName', 'P')
    })
    cy.get('#recommendations blockquote').should('not.exist')
    cy.get('#recommendations a').should('not.exist')
  })
})
