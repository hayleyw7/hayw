Cypress.Commands.add('visitHome', (options = {}) => {
  cy.visit('/', options)
  cy.get('main').should('be.visible')
})

Cypress.Commands.add('assertNoHorizontalOverflow', () => {
  cy.window().then((window) => {
    expect(window.document.documentElement.scrollWidth).to.be.at.most(window.innerWidth + 1)
  })
})

Cypress.Commands.add('assertExternalLinkIsSafe', { prevSubject: 'element' }, (subject) => {
  const href = subject.attr('href')

  expect(href, 'absolute HTTPS or mail link').to.match(/^(https:\/\/|mailto:)/)
  expect(subject.attr('target'), 'opens away from portfolio').to.equal('_blank')
  expect(subject.attr('rel')?.split(/\s+/), 'prevents opener access').to.include.members([
    'noopener',
    'noreferrer',
  ])

  return cy.wrap(subject)
})
