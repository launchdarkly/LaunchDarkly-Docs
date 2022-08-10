import getFinalDestination from '../../getFinalDestination'
import redirectRules from '../../redirectRules'

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
chai.use(require('chai-string'))

const redirectMap = redirectRules.reduce((map, r) => ({ ...map, [r.fromPath]: r.toPath }), {})

describe('Test redirect rules', () => {
  redirectRules.forEach(({ fromPath }) => {
    const finalDestination = getFinalDestination(redirectMap, fromPath)

    it(`${fromPath} -> ${finalDestination}`, () => {
      // cypress will get an initial 404 from gatsby serve on staging
      // hence we ignore that initial 404 response
      cy.visit(fromPath, { failOnStatusCode: false })
      cy.location('pathname').should('equal', finalDestination)
    })
  })
})
