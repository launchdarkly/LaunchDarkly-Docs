import legacyRedirectRules from '../../legacyRedirectRules'

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
chai.use(require('chai-string'))

describe('Test legacy redirect rules', () => {
  legacyRedirectRules.forEach(({ fromPath, toPath }) => {
    it(`${fromPath} -> ${toPath}`, () => {
      // cypress will get an initial 404 from gatsby serve on staging
      // hence we ignore that initial 404 response
      cy.visit(fromPath, { failOnStatusCode: false })
      cy.url().should('endWith', toPath)
    })
  })
})
