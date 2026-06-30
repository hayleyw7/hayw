describe('keyboard accessibility', () => {
  beforeEach(() => cy.visitHome())

  it('reaches interactive elements in visual document order', () => {
    const projectTitles = [
      'Critterwave',
      'Affirming Access',
      'Decisionator',
      'Limerickster',
      'Rancid Tomatillos',
      'Type My Pet',
      'Vibin Airline',
    ]
    const recognitionTitles = [
      'Volunteer of the Month',
      'Arrows Making an Impact',
      'Code The Dream',
      'Turing Showcase',
      'Neurodiverse Hackers',
      'GEN & Biotech News',
      'Seed to Sound',
      'The Rooster',
    ]
    const expectedOrder = [
      'Embark',
      'View recommendations on LinkedIn',
      ...projectTitles,
      ...recognitionTitles,
      'Twitter profile',
      'GitHub profile',
      'LinkedIn profile',
      'Send email',
    ]

    cy.get('a[href]').then(($links) => {
      const actualOrder = [...$links].map((link) => (
        link.getAttribute('aria-label')
        || link.closest('article')?.querySelector('h4')?.textContent
        || link.textContent.trim()
      ))
      expect(actualOrder).to.deep.equal(expectedOrder)
    })

    cy.get('a[href]').each(($link) => {
      expect($link[0].tabIndex, `${$link.attr('href')} tab index`).to.equal(0)
    })
  })

  it('activates Embark with the keyboard', () => {
    cy.get('.embark-btn').focus().type('{enter}')
    cy.location('hash').should('eq', '')
    cy.window().its('scrollY').should('be.greaterThan', 0)
  })
})
