describe('expense update test', () => {
    it('visits the root', () => {
    cy.visit('/');
    });
    it('clicks the menu button expenses option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'expenses').click();
    });
    it('selects Test, Expense', () => {
    cy.contains('2022-04-25').click();
    });
    it('updates amout', () => {
    cy.get("input[formcontrolname=amount]").clear();
    cy.get('input[formcontrolname=amount]').type('129.99');
    });
    it('clicks the save button', () => {
    cy.get('button').contains('Save').click();
    });
    it('confirms update', () => {
    cy.contains('updated!');
    });
   });
   