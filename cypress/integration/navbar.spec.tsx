context('Navbar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should render header', () => {
    cy.get('[data-cy=navbar]').contains('Home')
    cy.get('[data-cy=navbar]').contains('Explore')
    cy.get('[data-cy=navbar]').contains('Communities')
    cy.get('[data-cy=navbar]').contains('More')

    cy.get('[data-cy=navbar]').contains('More').click()
    cy.get('a').contains('Contact')
  })

  it('should render logo and login button', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-cy=navbar]')
      .find('img')
      .should('have.attr', 'src')
      .should('include', '/logo.svg')

    cy.get('[data-cy=navbar]')
      .get('[data-cy=login]')
      .find('img')
      .should('have.attr', 'src')
      .should('include', '/eth-white.svg')
    cy.get('[data-cy=navbar]').get('[data-cy=login]').contains('Login')
  })

  it('search bar test', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-cy=navbar]')
      .get('input')
      .invoke('attr', 'placeholder')
      .should('contain', 'Search...')

    cy.get('[data-cy=navbar]').get('input').type('sasi')
    cy.get('[data-cy=search-results]')
  })

  it('should navigate to right pages', () => {
    cy.get('[data-cy=navbar]').contains('Explore').click()
    cy.location('pathname').should('include', 'explore')
    cy.visit('http://localhost:3000')
    cy.get('[data-cy=navbar]').contains('Explore').click()
    cy.location('pathname').should('include', 'explore')
    cy.visit('http://localhost:3000')
    cy.get('[data-cy=navbar]').contains('Communities').click()
    cy.location('pathname').should('include', 'communities')
  })
})
export {}
