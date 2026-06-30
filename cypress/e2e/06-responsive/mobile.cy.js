describe('mobile and narrow layout', () => {
  const viewports = [
    ['common phone', 375, 667],
    ['minimum supported', 320, 568],
  ]

  viewports.forEach(([name, width, height]) => {
    context(name, () => {
      beforeEach(() => {
        cy.viewport(width, height)
        cy.visitHome()
      })

      it('hides secondary tagline details while keeping the primary role', () => {
        cy.get('.tagline').should('contain.text', 'Software Engineer')
        cy.get('.tagline-detail').should('not.be.visible')
      })

      it('keeps all buttons inside the viewport', () => {
        cy.get('a.button').each(($button) => {
          const bounds = $button[0].getBoundingClientRect()
          expect(bounds.left).to.be.at.least(0)
          expect(bounds.right).to.be.at.most(width)
        })
      })

      it('keeps portrait dimensions responsive', () => {
        cy.get('img.avatar').then(($avatar) => {
          const bounds = $avatar[0].getBoundingClientRect()
          expect(bounds.width).to.be.at.most(width)
          expect(bounds.height).to.be.at.most(368)
        })
      })

      it('has no horizontal page overflow', () => cy.assertNoHorizontalOverflow())
    })
  })
})
