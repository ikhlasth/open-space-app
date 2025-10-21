/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });
  it('should display login page correctly', () => {

    cy.get('input[placeholder="Username"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when username is empty', () => {
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"id" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Username"]').type('test');
    cy.get('button').contains(/^Login$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    cy.get('input[placeholder="Username"]').type('wrong');
    cy.get('input[placeholder="Password"]').type('wrong');
    cy.get('button').contains(/^Login$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('id or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    cy.get('input[placeholder="Username"]').type('testuser');
    cy.get('input[placeholder="Password"]').type('test123456');
    cy.get('button').contains(/^Login$/).click();
    cy.get('nav').contains(/^Home$/).should('be.visible');
    cy.get('button').contains('Sign out').should('be.visible');
  });

  // it('should create talks when user talk button', () => {
  //   cy.get('input[placeholder="Username"]').type('testuser');
  //   cy.get('input[placeholder="Password"]').type('test123456');
  //   cy.get('button').contains(/^Login$/).click();
  //   cy.get('textarea[placeholder="What are you thinking?"]').type('test Cypress add talk');
  //   // cy.get('button').contains('Talk').click();
  //   cy.intercept('POST', '**/v1/talks').as('createTalk');
  //   cy.get('button').contains('Talk').click();
  //   cy.wait('@createTalk'); // ✅ menunggu request selesai

  //   // cy.contains('button', 'Talk').should('be.enabled').click();
  //   cy.contains('test Cypress add talk').should('be.visible');
  //   cy.get('button').contains('Sign out').should('be.visible');
  // });

});