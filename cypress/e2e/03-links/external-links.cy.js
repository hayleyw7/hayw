import { socialLinks } from '../../fixtures/contracts.js'

describe('external links', () => {
  beforeEach(() => cy.visitHome())

  it('uses secure absolute destinations for every recognition action', () => {
    cy.get('.recognition-group a').should('have.length', 8).each(($link) => {
      cy.wrap($link).assertExternalLinkIsSafe()
    })
  })

  it('uses the expected destination for every social action', () => {
    Object.entries(socialLinks).forEach(([label, href]) => {
      cy.get(`#footer a[aria-label="${label}"]`)
        .should('have.attr', 'href', href)
        .assertExternalLinkIsSafe()
    })
  })

  it('does not create blank, fragment-only, JavaScript, or insecure HTTP external links', () => {
    cy.get('a').each(($link) => {
      const href = $link.attr('href')
      expect(href, $link.text()).to.be.a('string').and.not.be.empty
      expect(href).not.to.match(/^javascript:/i)
      expect(href).not.to.match(/^http:\/\//i)
      if (href.startsWith('#')) expect(href).to.equal('#one-two-b')
    })
  })
})
