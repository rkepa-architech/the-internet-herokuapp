it('C33 checks if button can be moved to the both right and left directions', () => {
    cy.visit('/horizontal_slider');

    /*
    This little function, when run in DevTools console, shows hint with coordinates of mouse pointer.
    Stored for further use.
    document.onmousemove = function(e){
        var x = e.pageX;
        var y = e.pageY;
        e.target.title = "X is "+x+" and Y is "+y;
    };
    */

    cy.get('input')
        .should('have.attr', 'min', '0.0')
        .and('have.attr', 'max', '5.0')
        .and('have.attr', 'step', '0.5');

    /*
    It only simulates clicking on the specific spot on the slider.
    It's in the Cypress docs though as a interaction with a range input (slider).
    */
    cy.get('input')
        .invoke('val', 5)
        .trigger('change')
        .click();

    cy.get('#range')
        .should('have.text', '5');

    cy.wait(500); // added for better visibility

    cy.get('input')
        .invoke('val', 2.5)
        .trigger('change')
        .click();

    cy.get('#range')
        .should('have.text', '2.5');

    cy.wait(500);

    cy.get('input')
        .invoke('val', 0)
        .trigger('change')
        .click();

    cy.get('#range')
        .should('have.text', '0');

    /*
    Code below also moves the slider, but it doesn't change the value so #range displays 0.
    cy.get('input').then(($el)=>$el.get(0).stepUp(10));
    */
    
    /*
    However, I can't figure how to test moving with arrows or drag&drop.
    I've tried .focus().trigger(keydown), .focus().type('{ rightArrow }').
    I've tried also .trigger('dragstart) and .click(8, 8) - note these are coordonates within element.
    But none of them worked so far.
    */

});