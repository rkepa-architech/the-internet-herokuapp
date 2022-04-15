context('Homepage', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('C18 checks if the list is loading', () => {
        cy.get('ul').invoke('prop', 'childElementCount')
        .should('be.eq', 44);
    });

    it('C29 checks if page title (welcome message) is visible', () => {
        cy.get('.heading').contains('Welcome to the-internet')
        .should('be.visible');
    });

    it('C30 checks if links are working (first, middle, last', () => {
        const links = ['/abtest', '/frames', '/tinymce'];

        links.forEach(link => {
            cy.get(`[href="${link}"]`).click();
            cy.location('pathname').should('eq', `${link}`);
            cy.go('back');
        });
    });

    it('C31 checks footer link', () => {
        cy.get('#page-footer a')
        .should('have.attr', 'href', 'http://elementalselenium.com/')
        .and('have.attr', 'target', '_blank');
    });

    it('C45 validate redirected page text', () => {
        cy.visit('/redirector');
        cy.url().should('contain', '/redirector');
        cy.get('p').invoke('prop', 'textContent')
        .should('contain', 'This is separate from directly returning a redirection status code, in that some browsers cannot handle a raw redirect status code without a destination page as part of the HTTP response.')
        .and('contain', 'Click here to trigger a redirect (and be taken to the status codes page).')
        .and('contain', '\n');

        cy.get('a#redirect')
        .should('have.text', 'here')
        .and('have.attr', 'href', 'redirect');

    });
});