describe('employee update test', () => {
    it('visits the root', () => {
    cy.visit('/');
    });
    it('clicks the menu button employees option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'employees').click();
    });
    it('selects Test, Employee', () => {
    cy.contains('John, Doe').click();
    });
    it('updates email', () => {
    cy.get("[type='email']").clear();
    cy.get("[type='email']").type('jd@here.ca');
    });
    it('clicks the save button', () => {
    cy.get('button').contains('Save').click();
    });
    it('confirms update', () => {
    cy.contains('updated!');
    });
   });
   