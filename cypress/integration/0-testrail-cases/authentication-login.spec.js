context ('Authentication/Login', () => {

    beforeEach(() => {
        cy.visit('/login');

    });

    /*
    .type() is overwritten in commands.js to hide pass in cypress log with asterisks
    if {sensitive: true} object is provided as an option
    */
    it('C34 should login with VALID LOGIN and VALID PASS', () => {
        cy.get('#username')
            .type(Cypress.env('credentials').username);
        
        cy.get('#password')
            .type(Cypress.env('credentials').password, {sensitive: true});

        cy.get('.radius')
            .contains('Login')
            .click();

        cy.url()
            .should('include', '/secure');

    });

    it('C35 should NOT login with VALID LOGIN and INVALID PASS', () => {
        cy.get('#username')
            .type(Cypress.env('credentials').username);

        cy.get('#password')
            .type(Cypress.env('credentials').invalidpass);

        cy.get('.radius')
            .contains('Login')
            .click();

        cy.url()
            .should('not.include', '/secure');

    });

    it('C36 should NOT login with INVALID LOGIN and VALID PASS', () => {
        cy.get('#username')
            .type(Cypress.env('credentials').invaliduser);

        cy.get('#password')
            .type(Cypress.env('credentials').password, {sensitive: true});

        cy.get('.radius')
            .contains('Login')
            .click();

        cy.url()
            .should('not.include', '/secure');

    });

    it('C37 should NOT login with VALID LOGIN and EMPTY PASS', () => {
        cy.get('#username')
            .type(Cypress.env('credentials').username);

        cy.get('#password')
            .clear();

        cy.get('.radius')
            .contains('Login')
            .click();

        cy.url()
            .should('not.include', '/secure');

    });

    it('C38 should NOT login with EMPTY LOGIN and VALID PASS', () => {
        cy.get('#username')
            .clear();

        cy.get('#password')
            .type(Cypress.env('credentials').password, {sensitive: true});

        cy.get('.radius')
            .contains('Login')
            .click();

        cy.url()
            .should('not.include', '/secure');

    });

    it('C39 should NOT login with EMPTY LOGIN and EMPTY PASS', () => {
        cy.get('#username')
            .clear();

        cy.get('#password')
            .clear();

        cy.get('.radius')
            .contains('Login')
            .click();

        cy.url()
            .should('not.include', '/secure');

    });

});