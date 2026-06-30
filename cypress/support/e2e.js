import 'cypress-axe'
import './commands.js'

beforeEach(() => {
  cy.on('window:before:load', (win) => {
    cy.stub(win.console, 'error').as('consoleError')
  })
})

afterEach(() => {
  cy.get('@consoleError').should('not.have.been.called')
})
