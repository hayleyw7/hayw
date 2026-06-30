describe('tablet layout', () => {
  beforeEach(() => {
    cy.viewport(768, 1024)
    cy.visitHome()
  })

  const revealSectionNav = () => {
    cy.get('#header').then(($header) => {
      cy.window().then((win) => win.scrollTo(0, Math.ceil($header.outerHeight()) + 1))
    })
    cy.get('#section-nav').should('be.visible')
  }

  it('stacks medium breakpoint columns and centers the portrait', () => {
    cy.get('.main-content-container').then(($column) => {
      expect($column[0].getBoundingClientRect().width).to.equal(
        $column[0].parentElement.getBoundingClientRect().width,
      )
    })
    cy.get('.imp-medium').then(($column) => {
      expect($column[0].getBoundingClientRect().width).to.equal(
        $column[0].parentElement.getBoundingClientRect().width,
      )
    })
    cy.get('.avatar-container').should('have.css', 'justify-content', 'center')
  })

  it('keeps recognition actions and copy visible', () => {
    cy.get('#recognition .content-group article').each(($article) => {
      cy.wrap($article).should('be.visible').find('.button').should('be.visible')
    })
  })

  it('reveals the section nav after the hero and keeps it inside the viewport', () => {
    cy.get('#section-nav').should('have.attr', 'hidden')
    revealSectionNav()
    cy.get('#section-nav').should('not.have.attr', 'hidden')
    cy.get('#section-nav').then(($nav) => {
      const bounds = $nav[0].getBoundingClientRect()
      expect(bounds.left).to.be.at.least(0)
      expect(bounds.right).to.be.at.most(768)
      expect(bounds.bottom).to.be.at.most(1024)
    })
  })

  it('keeps tablet hash navigation aligned below the navbar', () => {
    revealSectionNav()
    cy.get('#section-nav a[href="#portfolio"]').click({ scrollBehavior: false })
    cy.get('#portfolio').should(($projects) => {
      const nav = $projects[0].ownerDocument.querySelector('#section-nav')
      const difference = $projects[0].getBoundingClientRect().top
        - nav.getBoundingClientRect().bottom
      expect(Math.abs(difference)).to.be.lessThan(1)
    })
  })

  it('keeps the layout usable at large text scale', () => {
    cy.visitHome({
      onBeforeLoad(win) {
        win.document.documentElement.style.fontSize = '200%'
      },
    })

    cy.get('html').should(($html) => {
      expect(Number.parseFloat(getComputedStyle($html[0]).fontSize)).to.be.greaterThan(16)
    })
    cy.get('#header').should('be.visible')
    revealSectionNav()
    cy.get('#section-nav').then(($nav) => {
      const bounds = $nav[0].getBoundingClientRect()
      expect(bounds.left).to.be.at.least(0)
      expect(bounds.right).to.be.at.most(768)
    })
    cy.assertNoHorizontalOverflow()
  })

  it('keeps the footer usable when large text and reduced motion combine', () => {
    cy.then(() => Cypress.automation('remote:debugger:protocol', {
      command: 'Emulation.setEmulatedMedia',
      params: { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] },
    }))

    cy.visitHome({
      onBeforeLoad(win) {
        win.document.documentElement.style.fontSize = '200%'
      },
    })

    revealSectionNav()
    cy.get('#section-nav a[href="#contact"]').click({ scrollBehavior: false })
    cy.get('#contact').should('be.visible')
    cy.get('#contact .icons').should('have.class', 'contact-arrival')
    cy.assertNoHorizontalOverflow()

    cy.then(() => Cypress.automation('remote:debugger:protocol', {
      command: 'Emulation.setEmulatedMedia',
      params: { features: [] },
    }))
  })

  it('has no horizontal page overflow', () => cy.assertNoHorizontalOverflow())
})
