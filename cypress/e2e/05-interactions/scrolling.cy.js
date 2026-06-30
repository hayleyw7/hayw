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

  it('reveals section navigation on mobile only after passing the hero', () => {
    cy.viewport(390, 844)
    cy.visit('/')
    cy.get('#section-nav').should('have.attr', 'hidden')
    cy.window().then((win) => {
      win.scrollTo(0, win.innerHeight / 2)
    })
    cy.get('#section-nav').should('have.attr', 'hidden')
    cy.get('#header').then(($header) => {
      cy.window().then((win) => win.scrollTo(0, $header.outerHeight()))
    })
    cy.get('#section-nav').should('not.have.attr', 'hidden')
    cy.get('#section-nav').should('be.visible')
  })

  it('keeps the mobile navbar visible after navigating back to About', () => {
    cy.viewport(390, 844)
    cy.visit('/')
    cy.get('#header').then(($header) => {
      cy.window().then((win) => win.scrollTo(0, $header.outerHeight()))
    })
    cy.get('#section-nav').should('be.visible')
    cy.get('#section-nav a[href="#intro"]').click({ scrollBehavior: false })
    cy.get('#section-nav').should('be.visible')
    cy.get('#intro').should(($intro) => {
      const nav = $intro[0].ownerDocument.querySelector('#section-nav')
      const difference = $intro[0].getBoundingClientRect().top
        - nav.getBoundingClientRect().bottom
      expect(Math.abs(difference)).to.be.lessThan(1)
    })
  })

  it('reveals section navigation on desktop only after passing the hero', () => {
    cy.get('#section-nav').should('have.attr', 'hidden')
    cy.window().then((win) => {
      win.scrollTo(0, win.innerHeight / 2)
    })
    cy.get('#section-nav').should('have.attr', 'hidden')
    cy.get('#header').then(($header) => {
      cy.window().then((win) => win.scrollTo(0, $header.outerHeight()))
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

  it('navigates to contact and cues the footer icons on arrival', () => {
    cy.window().then((win) => {
      win.scrollTo(0, win.innerHeight)
    })
    cy.get('#section-nav a[href="#footer"]').click({ scrollBehavior: false })
    cy.location('hash').should('eq', '#footer')
    cy.get('#footer .icons').should('have.class', 'contact-arrival')
  })

  it('aligns each section color boundary with the navbar bottom', () => {
    const destinations = [
      ['#intro', '#intro'],
      ['#impact', '#impact'],
      ['#recommendations', '#recommendations'],
      ['#projects', '#projects'],
      ['#recognition', '#recognition'],
      ['#footer', '#footer'],
    ]

    cy.get('#header').then(($header) => {
      cy.window().then((win) => win.scrollTo(0, $header.outerHeight()))
    })
    cy.get('#section-nav').should('be.visible')

    destinations.forEach(([href, target]) => {
      cy.get(`#section-nav a[href="${href}"]`).click({ scrollBehavior: false })
      cy.get(target).should(($target) => {
        const nav = $target[0].ownerDocument.querySelector('#section-nav')
        expect(nav.hidden).to.equal(false)
        const navBottom = nav.getBoundingClientRect().bottom
        const sectionTop = $target[0].getBoundingClientRect().top
        expect(Math.abs(sectionTop - navBottom)).to.be.lessThan(1)
      })
    })
  })
})
