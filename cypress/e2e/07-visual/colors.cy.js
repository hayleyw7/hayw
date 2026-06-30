describe('color and typography contracts', () => {
  beforeEach(() => cy.visitHome())

  it('uses the intended base colors for light and dark sections', () => {
    cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.get('#profile').should('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.get('#impact').should('have.css', 'background-color', 'rgb(51, 60, 68)')
    cy.get('#impact h2').should('have.css', 'color', 'rgb(157, 177, 192)')
    cy.get('#recommendations').should('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.get('#recommendations h2').should('have.css', 'color', 'rgb(109, 127, 146)')
    cy.get('#recommendations h3').should('have.css', 'color', 'rgb(51, 60, 68)')
    cy.get('#projects').should('have.css', 'background-color', 'rgb(51, 60, 68)')
    cy.get('#projects h2').should('have.css', 'color', 'rgb(157, 177, 192)')
    cy.get('#recognition').should('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.get('#recognition h2').should('have.css', 'color', 'rgb(109, 127, 146)')
    cy.get('#recognition h3').should('have.css', 'color', 'rgb(51, 60, 68)')
  })

  it('uses the intended skill panel palette and monospace type', () => {
    cy.get('.skill-col')
      .should('have.css', 'background-color', 'rgb(245, 247, 248)')
      .and('have.css', 'color', 'rgb(38, 53, 71)')
      .and('have.css', 'border-top-color', 'rgb(109, 127, 146)')
      .and('have.css', 'font-family')
      .and('match', /Courier New/)
  })

  it('preserves the branded gradients and readable header text', () => {
    cy.get('#header')
      .should('have.css', 'background-image')
      .and('include', 'linear-gradient')
    cy.get('#footer')
      .should('have.css', 'background-image')
      .and('include', 'linear-gradient')
    cy.get('#header h1').should('have.css', 'color', 'rgb(255, 255, 255)')
  })

  it('still renders with the fallback font stack if the web font stylesheet fails', () => {
    cy.intercept('GET', 'https://fonts.googleapis.com/**', {
      statusCode: 503,
      body: '',
    })

    cy.visitHome()

    cy.get('body')
      .should('be.visible')
      .and('have.css', 'font-family')
      .and('match', /Source Sans Pro/)
      .and('match', /sans-serif/)
  })
})
