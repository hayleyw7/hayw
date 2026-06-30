describe('automated accessibility', () => {
  const sizes = [
    ['desktop', 1280, 800],
    ['tablet', 768, 1024],
    ['mobile', 375, 667],
  ]

  sizes.forEach(([name, width, height]) => {
    it(`has no detectable WCAG A/AA violations on ${name}`, () => {
      cy.viewport(width, height)
      cy.visitHome()
      cy.get('body').should('not.have.class', 'is-preload')
      cy.injectAxe()
      cy.checkA11y(undefined, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
        },
      }, (violations) => {
        const details = violations.map(({ id, impact, nodes }) => (
          `${id} (${impact}): ${nodes.map((node) => node.target.join(' ')).join(', ')}`
        )).join('\n')
        expect(violations, details).to.be.empty
      })
    })
  })
})
