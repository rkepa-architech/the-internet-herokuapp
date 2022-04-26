context('Frames', () => {

    //switchToIframe is a custom command
    it('C20 checks if iFrame Default Content is loading', () => {
        cy.visit('/iframe');

        cy.switchToIframe('#mce_0_ifr')
            .should('be.visible')
            .and('have.text', 'Your content goes here.');
    });

    it('C21 checks if iFrame features are working', () => {
        cy.visit('/iframe');
        
        cy.switchToIframe('#mce_0_ifr')
            .then(() => {
                cy.get('.tox-statusbar')
                    .invoke('prop', 'textContent')
                    .should('not.contain', 'strong');

                cy.get('[title="Bold"]')
                    .click();

                cy.get('.tox-statusbar')
                    .invoke('prop', 'textContent')
                    .should('contain', 'strong');
        });
    });
    
    it('C22 checks if user can enter text in iFrame', () => {
        cy.visit('/iframe');

        cy.switchToIframe('#mce_0_ifr')
            .clear()
            .type('hello')
            .should('have.text', 'hello');
    });

    //switchToNestedFrame is a custom command
    it('C23 checks if middle frame has text "Middle"', () => {
        cy.visit('/nested_frames');

        cy.switchToNestedFrame('[name="frame-top"]', '[name="frame-middle"]')
            .within(() => {
                cy.get('#content')
                .should('be.visible')
                .and('have.text', 'MIDDLE');
            })   
    });

});