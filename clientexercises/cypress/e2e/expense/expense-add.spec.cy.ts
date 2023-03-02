describe('expense add test', () => {
    it('visits the root', () => {
    cy.visit('/');
    });
    it('clicks the menu button expenses option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'expenses').click();
    });
    it('clicks add icon', () => {
    cy.contains('control_point').click();
    });
    it('fills in fields', () => {
    cy.get('mat-select[formcontrolname="employeeid"]').click(); // open the list
    cy.get('mat-option').should('have.length.gt', 0); // wait for options
    cy.contains('Smartypants').click();
    cy.get('mat-select[formcontrolname="categoryid"]').click();
    cy.get('mat-option').contains('Travel').click();
    cy.get('input[formcontrolname=description]').type('plane tickets');
    cy.get('input[formcontrolname=amount]').type('129.99');
    cy.get('input[formcontrolname=dateincurred]').type('2022-04-25').click();
    });
    it('clicks the save button', () => {
    cy.get('button').contains('Save').click();
    });
    it('confirms add', () => {
    cy.contains('added!');
    });
   });
   