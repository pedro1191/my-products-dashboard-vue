// https://docs.cypress.io/api/table-of-contents

describe('Home.vue', () => {
  it('Loads the home page content', () => {
    cy.visit('/');
    cy.url().should('eq', Cypress.config().baseUrl + 'login');

    cy.get('nav').within(() => {
      cy.get('a[title="FoodClub"]');
      cy.contains('a', 'About');
      cy.contains('a', 'Login');
    });

    cy.get('form').within(() => {
      cy.get('#email');
      cy.get('#password');
      cy.get('button').should('be.enabled').click();
    });

    cy.url().should('eq', Cypress.config().baseUrl);

    cy.get('nav').within(() => {
      cy.get('a[title="FoodClub"]');
      cy.contains('a', 'Home');
      cy.contains('a', 'About');
      cy.contains('a', 'Manage');
      cy.contains('a', 'Chefs');
      cy.contains('a', 'Dishes');
      cy.contains('button', 'Logout');
    });

    cy.contains('h1', 'Welcome to the FoodClub Dashboard');
  });
});
