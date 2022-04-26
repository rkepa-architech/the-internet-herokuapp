context ('Drag and Drop', () => {
    /*
    Because app throws uncaught exception at the dragstart, Cypress was failing the test (it's the default behavior).
    That's why I added code below, which makes Cypress ignore exception.
    
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    */

    /*
    Now, with ignoring exception test goes on, but unfortunately after dropping the A onto B, both columns have B in header, so test fails.
    Strangely enough, for some reason drag & drop done manually works correctly (at least headers are switched).
    */
    
    /*
    UPDATE!!!
    Turns out all I was missing was the dataTransfer const and providing it in .trigger() with dragstart/drop.
    Apparently without it incorrect event type is generated (Event, instead of DragEvent).
    */
    it('C32 checks if user can switch two boxes by dragging and dropping', () => {
        const dataTransfer = new DataTransfer();
        cy.visit('/drag_and_drop');
        cy.get('#column-a header').should('have.text', 'A');
        cy.get('#column-b header').should('have.text', 'B');

        cy.get('#column-a').trigger('dragstart', { dataTransfer });
        cy.get('#column-b').trigger('drop', { dataTransfer });
        cy.get('#column-b header').should('have.text', 'A');
        cy.get('#column-a header').should('have.text', 'B');
    });

});