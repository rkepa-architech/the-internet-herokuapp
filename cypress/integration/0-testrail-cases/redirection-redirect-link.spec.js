context('Redirection/Redirect link', () => {

    it('C44 Click on Redirect link', () => {
        cy.visit('/')

        cy.get('a')
            .contains('Redirect Link')
            .should('have.attr', 'href', '/redirector')
            .click();

        cy.url()
            .should('contain', '/redirector');

    });

});