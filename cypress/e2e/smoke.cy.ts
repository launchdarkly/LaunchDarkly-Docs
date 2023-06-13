describe('Documentation website', () => {
  it('should be navigable', () => {
    cy.visit('/home', { failOnStatusCode: false })
    cy.title().should('equal', 'Welcome to LaunchDarkly docs')
    cy.wait(1000) // wait for hydration

    // navigate to a page
    cy.get('main a').contains('Getting started').click()
    cy.wait(5000) // wait for hydration

    cy.title().should('equal', 'Getting started')

    cy.wait(2000)
    // interact with nav
    cy.get('nav').contains('a', 'Getting started').isActiveLink()
    // sub link under getting started
    cy.get('nav').contains('a', 'Setting up an SDK')

    // close
    // skipping for now because cypress is having trouble with useLayoutEffect
    // cy.get('nav').contains('a', 'Getting started').click()
    // cy.get('nav').contains('a', 'Setting up an SDK').should('not.exist')
    cy.get('nav').contains('a', 'Getting started').isActiveLink()
    cy.get('nav').contains('a', 'Setting up an SDK').click()
    cy.get('nav').contains('a', 'Setting up an SDK').isActiveLink()

    // click a link in the table of contents
    cy.get('nav').contains('a', 'Getting started').click()
    cy.get('aside').contains('Additional resources').click()
    cy.location('hash').should('equal', '#additional-resources')
    cy.get('main h2').contains('Additional resources')

    // interact with nav again
    cy.get('nav').contains('Organizing your flags').click()
    cy.title().should('equal', 'Organizing your flags')
    cy.get('nav').contains('Organizing your flags').isActiveLink()
    cy.get('nav').contains('The flags list').click()
    cy.title().should('equal', 'The flags list')
    cy.get('nav').contains('The flags list').isActiveLink()
    cy.get('nav').contains('Organizing your flags').isPartiallyActiveLink()

    // verify an image
    cy.get('main figure:first').find('figcaption').should('have.text', 'The feature flags list.')
    cy.get('main figure:first a').should('have.attr', 'target', '_blank')
    cy.get('main figure:first img')
      .invoke('attr', 'src')
      .then(src => {
        // this stops typescript warnings
        if (src === undefined) {
          return cy.contains('Image is missing').should('not.exist')
        }

        let url = src
        const bucketPrefix = Cypress.env('bucket_prefix')
        if (bucketPrefix) {
          url = url.replace(`/${bucketPrefix}`, '')
        }
        cy.request(url).its('status').should('eq', 200)
      })

    // verify search
    cy.get('header input').should('have.attr', 'placeholder', 'Search').type('advanced')

    cy.contains(/Results \(\d+\)/)

    cy.wait(1000) // wait for hydration

    // click search result
    cy.get('[data-test="result-Home-Advanced concepts"]').click()

    cy.location('search').should('equal', '?q=advanced')
    cy.get('nav').contains('Advanced').isActiveLink()

    cy.get('nav').contains('Billing and usage')
    cy.contains('a', 'Integrations').click()
    cy.title().should('equal', 'Integrations')
    cy.get('h1').contains('Integrations')
  })

  it('should let a user copy a code snippet', done => {
    cy.visit('/sdk/features/aliasing-users#electron')

    // need to wait for react rerenders
    cy.wait(1000)
    cy.contains('Expand Electron code sample').parent().click()
    cy.contains('Click to collapse')

    cy.window()
      .its('navigator.clipboard')
      .then(clipboard => {
        cy.stub(clipboard, 'writeText').as('writeText')
      })

    const $snippet = cy.get('.language-js').first()
    $snippet.siblings('button').first().should('contain', 'COPY').click()

    cy.get('@writeText').should('have.been.calledOnce')
    done()
  })

  it('should let a user copy a code snippet multiple times', done => {
    cy.visit('/sdk/features/aliasing-users#electron')

    cy.window()
      .its('navigator.clipboard')
      .then(clipboard => {
        cy.stub(clipboard, 'writeText').as('writeText')
      })

    // need to wait for react rerenders
    cy.wait(1000)
    // Open electron snippet, copy, close again
    cy.contains('Expand Electron code sample').parent().click()
    cy.contains('Click to collapse')
    const $snippet1 = cy.get('.language-js').first()
    $snippet1.siblings('button').first().should('contain', 'COPY').click()
    cy.contains('Click to collapse').parent().click()

    // Open flutter, copy, check clipboard
    cy.contains('Expand Flutter code sample').parent().click()
    const $snippet2 = cy.get('.language-dart').first()
    $snippet2.siblings('button').first().should('contain', 'COPY').click()

    cy.get('@writeText').should('have.been.calledTwice')
    done()
  })
})
