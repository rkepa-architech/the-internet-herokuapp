context ('Dropdown', () => {

    beforeEach(() => {
        cy.visit('/dropdown');
    });    

    it('C26 checks if "Dropdown List" text is present', () => {
        cy.findByText('Dropdown List')
            .should('be.visible')
            .and('have.text', 'Dropdown List');
    });

    it('C27 checks if two options are selectable in the list and C28 checks if user can select one of the dropdown options', () => {
        // First option (with index 0) can't be selected (because of <option> "disabled" attr?), so only option with index 1 and 2 is selectable
        const options = [1, 2];

        options.forEach(e => {
            cy.get('#dropdown')
                .select(e)
                .then(() => {
                    cy.get('[selected="selected"]')
                        .should('be.visible')
                        .and('have.text', `Option ${e}`)
            });
        });
    });

})