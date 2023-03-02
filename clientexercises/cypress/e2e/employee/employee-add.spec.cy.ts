describe('employee add test', () => {
    it('visits the root', () => {
    cy.visit('/');
    });
    it('clicks the menu button employees option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'employees').click();
    });
    it('clicks add icon', () => {
    cy.contains('control_point').click();
    });
    it('fills in fields', () => {
    cy.get('input[formcontrolname=title').type('Mr.');
    cy.get('input[formcontrolname=firstname').type('John');
    cy.get('input[formcontrolname=lastname').type('Doe');
    cy.get('input[formcontrolname=phoneno').type('(555)555-5555');
    cy.get('input[formcontrolname=email').type('jd@here.com');
    });
    it('clicks the save button', () => {
    cy.get('button').contains('Save').click();
    cy.wait(500);
    });
    it('confirms add', () => {
    cy.contains('added!');
    });
   });
   