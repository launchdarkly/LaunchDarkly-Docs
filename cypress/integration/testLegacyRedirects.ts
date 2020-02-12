import legacyRedirectRules from '../../legacyRedirectRules'

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
chai.use(require('chai-string'))

const baseUrl = Cypress.config().baseUrl

describe('Test legacy redirect rules', () => {
  legacyRedirectRules.forEach(({ fromPath, toPath }) => {
    it(`${fromPath} -> ${toPath}`, () => {
      cy.request({
        url: fromPath,
        followRedirect: false, // turn off following redirects
      }).then(resp => {
        expect(resp.status).to.eq(301)
        expect(resp.redirectedToUrl).to.eq(`${baseUrl}${toPath}`)
      })
    })
  })
})
