context('Entry Ad', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('a')
            .contains('Entry Ad')
            .click();
    });

    it('C40 verify Modal Window on Entry Ad page', () => {
        cy.url()
            .should('include', '/entry_ad');

        cy.get('#modal')
            .should('be.visible');

    });

    it('C41 verify if Modal Window is closed', () => {
        cy.get('#modal')
            .contains('Close')
            .click()
            .should('not.be.visible');

    });

    it('C42 verify if ad can be re-enabled and closed again', () => {
        cy.get('#modal')
            .contains('Close')
            .click()
            .should('not.be.visible');

        cy.get('a')
            .contains('click here')
            .click();
        
        cy.get('#modal')
            .should('be.visible')
            .contains('Close')
            .click()
            .should('not.be.visible');

    });

    /*
    This one is tricky, b/c modal is opened only not immediately after reload (js script on page waits 500 ms).
    So the question is should I check if modal doesn't appear at all or only immediately after reload.
    If the former, then ugly solution will be to just add cy.wait(500). I don't have the pretty solution yet.
    */
    it('C43 verify Modal Window does not appear on page load', () => {
        cy.get('#modal')
            .contains('Close')
            .click()
            .should('not.be.visible');
        
        cy.reload();

        // cy.wait(500);
        
        cy.get('#modal')
            .should('not.be.visible');

    });

});