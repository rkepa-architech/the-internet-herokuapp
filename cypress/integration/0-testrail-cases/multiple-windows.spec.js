context('Multiple Windows', () => {
    beforeEach(() => {
        cy.visit('/windows');

    });

    it('C46 should verify the href w/o clicking', () => {
        cy.get('a')
            .contains('Click Here')
            .should('have.attr', 'href', '/windows/new')
            .and('have.attr', 'target', '_blank');
    });

    /*
    Not sure what "modify" means in this context.
    I invoke href to open in the same window instead of a new tab as it is on page to check url after loading.
    */
    it('C47 should modify(???) <a> and check the new page', () => {
        cy.get('a')
            .contains('Click Here')
            .invoke('attr', 'target', '_self')
            .click();

        cy.url()
            .should('contain', '/windows/new');

    });

    it('C48 should extract the href and cy.visit() the page', () => {
        cy.get('a')
            .contains('Click Here')
            .invoke('attr', 'href')
            .then(($href) => {
                cy.visit($href);

                cy.url()
                    .should('contain', '/windows/new');

            });
            
    });

    it('C49 should extarct href and cy.request() the page to avoid wait of loading', () => {
        cy.get('a')
            .contains('Click Here')
            .invoke('attr', 'href')
            .then(($href) => {
                cy.request($href)
                    .its('body')
                    .should('include', '<h3>New Window</h3>');

            });

    });

});