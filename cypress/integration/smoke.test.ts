describe('Documentation website', () => {
  it('should be navigable', () => {
    // Set to desktop
    cy.viewport('macbook-16')
    cy.visit('/')
    cy.title().should('equal', 'Welcome to LaunchDarkly docs')

    // navigate to a page
    cy.get('main').contains('Getting started').click()
    cy.title().should('equal', 'Getting started')

    // interact with nav
    cy.get('nav').contains('Getting started').isActiveLink()
    cy.get('nav').contains('Setting up an SDK')
    // close
    cy.get('nav').contains('Getting started').click()
    cy.get('nav').contains('Setting up an SDK').should('not.exist')

    // click a link in the table of contents
    cy.get('aside').contains('Additional resources').click()
    cy.location('hash').should('equal', '#additional-resources')
    cy.get('main h2').contains('Additional resources')

    // interact with nav again
    cy.get('nav').contains('Organizing your flags').click()
    cy.title().should('equal', 'Organizing your flags')
    cy.get('nav').contains('Organizing your flags').isActiveLink()
    cy.get('nav').contains('The flags dashboard').click()
    cy.title().should('equal', 'The flags dashboard')
    cy.get('nav').contains('The flags dashboard').isActiveLink()
    cy.get('nav').contains('Organizing your flags').isPartiallyActiveLink()

    // verify an image
    cy.get('main figure:first').find('figcaption').should('have.text', 'The Feature flags dashboard.')
    cy.get('main figure:first a').should('have.attr', 'target', '_blank')
    cy.get('main figure:first img')
      .invoke('attr', 'src')
      .then(src => {
        // this stops typescript warnings
        if (src === undefined) {
          return cy.contains('Image is missing').should('not.exist')
        }

        let url = src
        const pr = Cypress.env('pr_number')
        if (pr) {
          url = url.replace(`/${pr}`, '')
        }
        cy.request(url).its('status').should('eq', 200)
      })

    // verify search
    cy.get('header input').should('have.attr', 'placeholder', 'Search').type('experimentation')

    cy.contains(/Results \(\d+\)/)

    // if it's too fast the result won't be clickable because it detaches from the page during re-render
    cy.wait(1000)

    // click search result
    cy.get('header').contains('Experimentation').click()

    cy.location('search').should('equal', '?q=experimentation')
    cy.get('nav').contains('Experimentation').isActiveLink()

    cy.wait(1000)

    cy.get('nav').contains('Creating experiments')

    cy.wait(1000)

    cy.get('header').contains('Integrations').click()

    cy.title().should('equal', 'Integrations')
    cy.get('h1').contains('Integrations')
  })
})
