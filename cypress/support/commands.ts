/// <reference types="cypress" />

// These correspond to theme file
const brandBlue = 'rgb(64, 91, 255)'
const grayscaleGray700 = 'rgb(88, 89, 91)'
const fontWeightBold = '600'

declare namespace Cypress {
  interface Chainable {
    /**
     * Add commands here
     */
    isActiveLink(): Chainable<Element>
    isPartiallyActiveLink(): Chainable<Element>
  }
}

Cypress.Commands.add('isActiveLink', { prevSubject: 'element' }, (subject: JQuery<HTMLElement>) => {
  cy.wrap(subject).should('have.css', 'font-weight', fontWeightBold).should('have.css', 'color', brandBlue)
})

Cypress.Commands.add('isPartiallyActiveLink', { prevSubject: 'element' }, (subject: JQuery<HTMLElement>) => {
  cy.wrap(subject).should('have.css', 'font-weight', fontWeightBold).should('have.css', 'color', grayscaleGray700)
})
