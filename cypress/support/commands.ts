/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Overwrites default error message with the one provided.
     * @example cy.get('#foo').withFailMessage('could not find element')
     */
    withFailMessage(getMessage: (originalErrorMessage: string) => string): Chainable<Element>
  }
}

// This message will be used for any failure within the test it's declared in, not just what it's chained to
Cypress.Commands.add('withFailMessage', { prevSubject: true }, (chainedSubject, getMessage) => {
  cy.on('fail', error => {
    error.message = getMessage(error.message)
    throw error
  })
  return chainedSubject
})
