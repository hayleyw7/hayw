const WHITE = 'rgb(255, 255, 255)'
const SLATE_BUTTON = 'rgb(95, 113, 132)'
const BLUE_GRAY = 'rgb(109, 127, 146)'

const findRule = (window, matchingSelector) => {
  const visitRules = (rules) => {
    for (const rule of rules) {
      if (rule.selectorText?.split(',').map((selector) => selector.trim()).includes(matchingSelector)) {
        return rule
      }
      if (rule.cssRules) {
        const nestedMatch = visitRules(rule.cssRules)
        if (nestedMatch) return nestedMatch
      }
    }
    return undefined
  }

  for (const sheet of window.document.styleSheets) {
    try {
      const match = visitRules(sheet.cssRules)
      if (match) return match
    } catch {
      // Cross-origin font stylesheets are not inspectable and do not define app hover states.
    }
  }
  return undefined
}

describe('hover states', () => {
  beforeEach(() => cy.visitHome())

  it('defines a visible branded hover response for Embark', () => {
    cy.window().then((window) => {
      const rule = findRule(window, '#header .embark-btn:hover')
      expect(rule, 'Embark hover rule').to.exist
      expect(rule.style.background).to.include('255, 255, 255')
      expect(rule.style.color).to.equal(BLUE_GRAY)
      expect(rule.style.opacity).to.equal('0.8')
    })
    cy.get('.embark-btn').trigger('mouseover').should('be.visible')
  })

  it('applies branded Embark hover styles instead of generic header link hovers', () => {
    const HEADER_LINK_HOVER_BG = 'rgba(255, 255, 255, 0.125)'

    cy.get('#header .embark-btn')
      .should('have.css', 'color', WHITE)
      .trigger('mouseover')
      .should('have.css', 'background-color', WHITE)
      .and('have.css', 'color', BLUE_GRAY)
      .and('have.css', 'opacity', '0.8')
      .and('not.have.css', 'background-color', HEADER_LINK_HOVER_BG)

    cy.get('#header .embark-btn strong').should('have.css', 'color', BLUE_GRAY)
  })

  it('defines a high-contrast hover response for recognition actions', () => {
    cy.window().then((window) => {
      const rule = findRule(window, '#recognition .content-group .button:hover')
      expect(rule, 'recognition button hover rule').to.exist
      expect(rule.style.backgroundColor).to.equal(SLATE_BUTTON)
      expect(rule.style.color).to.equal(WHITE)
    })
    cy.get('#recognition .content-group .button').first().trigger('mouseover').should('be.visible')
  })

  it('defines a high-contrast hover response for project actions', () => {
    cy.window().then((window) => {
      const rule = findRule(window, '.content-group .button:hover')
      expect(rule, 'project button hover rule').to.exist
      expect(rule.style.backgroundColor).to.equal(SLATE_BUTTON)
      expect(rule.style.color).to.equal(WHITE)
    })
    cy.get('#portfolio .content-group .button').first().trigger('mouseover').should('be.visible')
  })

  it('defines a high-contrast hover response for recommendation actions', () => {
    cy.window().then((window) => {
      const rule = findRule(window, '#recommendations .recommendations-source .button:hover')
      expect(rule, 'recommendations button hover rule').to.exist
      expect(rule.style.backgroundColor).to.equal(SLATE_BUTTON)
      expect(rule.style.color).to.equal(WHITE)
    })
    cy.get('#recommendations .recommendations-source .button').trigger('mouseover').should('be.visible')
  })

  it('defines a visible footer-link hover color', () => {
    cy.window().then((window) => {
      const rule = findRule(window, '#contact a:hover')
      expect(rule, 'footer hover rule').to.exist
      expect(rule.style.color).to.equal(WHITE)
    })
    cy.get('#contact a').first().trigger('mouseover').should('be.visible')
  })

  it('defines a visible footer invitation hover color', () => {
    cy.window().then((window) => {
      const rule = findRule(window, '.footer-text:hover')
      expect(rule, 'footer invitation hover rule').to.exist
      expect(rule.style.color).to.equal(WHITE)
    })
    cy.get('#contact .footer-text').trigger('mouseover').should('be.visible')
  })
})
