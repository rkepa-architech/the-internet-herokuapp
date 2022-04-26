// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';
import 'cypress-plugin-snapshots/commands';

Cypress.Commands.add('switchToIframe', (iframe) => {
    return cy
    .get(iframe)
    .its('0.contentDocument.body')
    .then(cy.wrap);
});

Cypress.Commands.add('switchToNestedFrame', (frame, nestedFrame) => {
    return cy
    .get(frame).its('0.contentDocument.body')
    .find(nestedFrame).its('0.contentDocument.body')
    .then(cy.wrap)
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        options.log = false;

        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length)
        });
    };

    return originalFn(element, text, options);
});
