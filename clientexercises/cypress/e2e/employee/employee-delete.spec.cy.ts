describe('employee delete test', () => {
    it('visits the root', () => {
    cy.visit('/');
    });
    it('clicks the menu button employees option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'employees').click();
    });
    it('selects Test Employee', () => {
    cy.contains('John, Doe').click();
    });
    it('clicks the delete button', () => {
    cy.get('button').contains('Delete').click();
    });
    it('confirms delete', () => {
    cy.contains('deleted!');
    });
   });
   