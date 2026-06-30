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
      const rule = findRule(window, '.embark-btn:hover')
      expect(rule, 'Embark hover rule').to.exist
      expect(rule.style.background).to.include('white')
      expect(rule.style.color).to.equal('rgb(109, 127, 146)')
      expect(rule.style.opacity).to.equal('0.8')
    })
    cy.get('.embark-btn').trigger('mouseover').should('be.visible')
  })

  it('defines a high-contrast hover response for recognition actions', () => {
    cy.window().then((window) => {
      const rule = findRule(window, '#recognition .content-group .button:hover')
      expect(rule, 'recognition button hover rule').to.exist
      expect(rule.style.backgroundColor).to.equal('rgb(95, 113, 132)')
      expect(rule.style.color).to.equal('white')
    })
    cy.get('#recognition .content-group .button').first().trigger('mouseover').should('be.visible')
  })

  it('defines a high-contrast hover response for project actions', () => {
    cy.window().then((window) => {
      const rule = findRule(window, '.content-group .button:hover')
      expect(rule, 'project button hover rule').to.exist
      expect(rule.style.backgroundColor).to.equal('rgb(95, 113, 132)')
      expect(rule.style.color).to.equal('white')
    })
    cy.get('#portfolio .content-group .button').first().trigger('mouseover').should('be.visible')
  })

  it('defines a high-contrast hover response for recommendation actions', () => {
    cy.window().then((window) => {
      const rule = findRule(window, '#recommendations .recommendations-source .button:hover')
      expect(rule, 'recommendations button hover rule').to.exist
      expect(rule.style.backgroundColor).to.equal('rgb(95, 113, 132)')
      expect(rule.style.color).to.equal('white')
    })
    cy.get('#recommendations .recommendations-source .button').trigger('mouseover').should('be.visible')
  })

  it('defines a visible footer-link hover color', () => {
    cy.window().then((window) => {
      const rule = findRule(window, '#contact a:hover')
      expect(rule, 'footer hover rule').to.exist
      expect(rule.style.color).to.equal('rgb(255, 255, 255)')
    })
    cy.get('#contact a').first().trigger('mouseover').should('be.visible')
  })
})
