describe('desktop layout', () => {
  beforeEach(() => {
    cy.viewport(1280, 800)
    cy.visitHome()
  })

  it('uses two columns for the introduction and impact areas', () => {
    cy.get('.main-content-container').then(($column) => {
      expect($column[0].getBoundingClientRect().width).to.be.closeTo(
        $column[0].parentElement.getBoundingClientRect().width / 2,
        2,
      )
    })
    cy.get('.major-icons-container').then(($column) => {
      expect($column[0].getBoundingClientRect().width).to.be.closeTo(
        $column[0].parentElement.getBoundingClientRect().width / 2,
        2,
      )
    })
  })

  it('shows the complete tagline and right-aligns the portrait column', () => {
    cy.get('.tagline-detail').should('be.visible')
    cy.get('.avatar-container').should('have.css', 'justify-content', 'flex-end')
  })

  it('has no horizontal page overflow', () => cy.assertNoHorizontalOverflow())

  it('left-aligns project and recognition card contents', () => {
    cy.get('#projects .content-group > .media-title, #recognition .content-group > .media-title, #recommendations .content-group > .media-title')
      .each(($heading) => cy.wrap($heading).should('have.css', 'text-align', 'left'))
    cy.get('#projects .content-group article, #recognition .content-group article').each(($card) => {
      cy.wrap($card).should('have.css', 'text-align', 'left')
      cy.wrap($card).find('.actions.special')
        .should('have.css', 'justify-content', 'flex-start')
        .and('have.css', 'text-align', 'left')
    })
  })

  it('places the single Critterwave card in the left project column', () => {
    cy.contains('#projects article h4', 'Critterwave').closest('article').then(($card) => {
      const card = $card[0].getBoundingClientRect()
      const row = $card[0].parentElement.getBoundingClientRect()
      expect(card.left).to.be.closeTo(row.left, 1)
    })
  })

  context('narrow desktop', () => {
    beforeEach(() => {
      cy.viewport(1141, 800)
      cy.visitHome()
    })

    it('keeps the two-column desktop layout just above the breakpoint', () => {
      cy.get('.main-content-container').then(($column) => {
        expect($column[0].getBoundingClientRect().width).to.be.closeTo(
          $column[0].parentElement.getBoundingClientRect().width / 2,
          2,
        )
      })
      cy.get('.major-icons-container').then(($column) => {
        expect($column[0].getBoundingClientRect().width).to.be.closeTo(
          $column[0].parentElement.getBoundingClientRect().width / 2,
          2,
        )
      })
    })

    it('keeps the section nav usable without horizontal overflow', () => {
      cy.get('#section-nav').should('have.attr', 'hidden')
      cy.window().then((win) => {
        win.scrollTo(0, win.innerHeight / 2)
      })
      cy.get('#section-nav').should('have.attr', 'hidden')
      cy.get('#header').then(($header) => {
        cy.window().then((win) => win.scrollTo(0, $header.outerHeight()))
      })
      cy.get('#section-nav').should('be.visible')
      cy.assertNoHorizontalOverflow()
    })
  })
})
