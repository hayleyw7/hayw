describe('motion preferences', () => {
  it('uses smooth scrolling in the default preference', () => {
    cy.visitHome()
    cy.get('html').should('have.css', 'scroll-behavior', 'smooth')
  })

  it('disables smooth scrolling and long transitions for reduced motion', () => {
    cy.then(() => Cypress.automation('remote:debugger:protocol', {
      command: 'Emulation.setEmulatedMedia',
      params: { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] },
    }))
    cy.visitHome()

    cy.get('html').should('have.css', 'scroll-behavior', 'auto')
    cy.get('.embark-btn').should(($button) => {
      const durations = getComputedStyle($button[0]).transitionDuration
        .split(',')
        .map((duration) => Number.parseFloat(duration))
      expect(durations.every((duration) => duration <= 0.00001)).to.equal(true)
    })
  })

  it('suppresses the contact arrival animation for reduced motion', () => {
    cy.then(() => Cypress.automation('remote:debugger:protocol', {
      command: 'Emulation.setEmulatedMedia',
      params: { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] },
    }))
    cy.visitHome()

    cy.window().then((win) => {
      win.scrollTo(0, win.innerHeight)
    })
    cy.get('#section-nav a[href="#footer"]').click({ scrollBehavior: false })
    cy.get('#footer .icons').should('have.class', 'contact-arrival')
    cy.get('#footer .icons li').first().should(($icon) => {
      const { animationDuration } = getComputedStyle($icon[0])
      expect(Number.parseFloat(animationDuration)).to.be.at.most(0.00001)
    })
  })

  afterEach(() => {
    cy.then(() => Cypress.automation('remote:debugger:protocol', {
      command: 'Emulation.setEmulatedMedia',
      params: { features: [] },
    }))
  })
})
