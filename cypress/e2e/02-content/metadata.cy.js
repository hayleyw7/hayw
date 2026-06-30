describe('document metadata', () => {
  beforeEach(() => cy.visitHome())

  it('sets the language, title, description, viewport, and favicon', () => {
    cy.get('html').should('have.attr', 'lang', 'en')
    cy.title().should('eq', 'Hayley Witherell | Software Engineer')
    cy.get('meta[name="description"]')
      .should('have.attr', 'content')
      .and('include', 'full-stack software engineer')
    cy.get('meta[name="viewport"]').should('have.attr', 'content', 'width=device-width, initial-scale=1.0')
    cy.get('link[rel="icon"]').should('have.attr', 'href', '/images/favicon.ico')
  })

  it('provides complete Open Graph metadata', () => {
    const expected = {
      title: 'Hayley Witherell',
      description: 'Full-stack software engineer portfolio with impact, recommendations, side projects, and recognition.',
      image: 'https://hayw.dev/images/preview4.png',
      url: 'https://hayw.dev',
      type: 'website',
    }

    Object.entries(expected).forEach(([property, content]) => {
      cy.get(`meta[property="og:${property}"]`).should('have.attr', 'content', content)
    })
  })

  it('provides complete Twitter card metadata', () => {
    const expected = {
      card: 'summary_large_image',
      title: 'Hayley Witherell',
      description: 'Full-stack software engineer portfolio with impact, recommendations, side projects, and recognition.',
      image: 'https://hayw.dev/images/preview4.png',
      url: 'https://hayw.dev',
    }

    Object.entries(expected).forEach(([name, content]) => {
      cy.get(`meta[name="twitter:${name}"]`).should('have.attr', 'content', content)
    })
  })
})
