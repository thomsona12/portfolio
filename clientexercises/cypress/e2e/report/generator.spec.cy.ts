describe('expense generator test', () => {
    it('visits the root', () => {
    cy.visit('/');
    });
    it('clicks the menu button expenses option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'generator').click();
    });
    it('selects an employee', () => {
    cy.wait(500);
    cy.get('mat-select[formcontrolname="employeeid"]').click();
    cy.contains('Smartypants').click();
    });
    it('selects an expense', () => {
    cy.wait(500);
    cy.get('mat-select[formcontrolname="expenseid"]').click();
    cy.contains('Hotel').click();
    });
    it('clicks the save button', () => {
    cy.get('button').contains('Save Report').click();
    });
    it('confirms report added', () => {
    cy.contains('added!');
    });
   });
   