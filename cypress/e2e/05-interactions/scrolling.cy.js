describe('scroll behavior', () => {
  beforeEach(() => cy.visitHome())

  it('starts at the top of the page', () => {
    cy.window().its('scrollY').should('eq', 0)
    cy.get('#header').should('be.visible')
  })

  it('Embark prevents the default jump and requests a smooth scroll', () => {
    cy.window().then((win) => {
      cy.stub(win, 'scrollTo').as('scrollTo')
    })
    cy.get('.embark-btn').click()
    cy.get('@scrollTo').should('have.been.calledOnce')
    cy.get('@scrollTo').its('firstCall.args.0.behavior').should('eq', 'smooth')
    cy.location('hash').should('eq', '')
  })

  it('can scroll through each major section and reach the footer', () => {
    ;['#intro', '#impact', '#recommendations', '#projects', '#recognition', '#footer'].forEach((selector) => {
      cy.get(selector).scrollIntoView().should('be.visible')
    })
    cy.window().its('scrollY').should('be.greaterThan', 0)
  })

  it('restores a direct fragment URL to valid content', () => {
    cy.visit('/#recognition')
    cy.location('hash').should('eq', '#recognition')
    cy.get('#recognition').should('be.visible')
  })

  it('reveals section navigation on mobile after one screen scroll', () => {
    cy.viewport(390, 844)
    cy.visit('/')
    cy.get('#section-nav').should('have.attr', 'hidden')
    cy.window().then((win) => {
      win.scrollTo(0, win.innerHeight)
    })
    cy.get('#section-nav').should('not.have.attr', 'hidden')
    cy.get('#section-nav').should('be.visible')
  })

  it('reveals section navigation after scrolling past the hero', () => {
    cy.get('#section-nav').should('have.attr', 'hidden')
    cy.window().then((win) => {
      win.scrollTo(0, win.innerHeight)
    })
    cy.get('#section-nav').should('not.have.attr', 'hidden')
    cy.get('#section-nav').should('be.visible')
  })

  it('jumps to a section with smooth scrolling and updates the fragment', () => {
    cy.window().then((win) => {
      win.scrollTo(0, win.innerHeight)
      cy.stub(win, 'scrollTo').as('scrollTo')
    })
    cy.get('#section-nav').should('not.have.attr', 'hidden')
    cy.get('#section-nav a[href="#impact"]').click({ scrollBehavior: false })
    cy.get('@scrollTo').should('have.been.calledOnce')
    cy.get('@scrollTo').its('firstCall.args.0.behavior').should('eq', 'smooth')
    cy.location('hash').should('eq', '#impact')
  })
})
