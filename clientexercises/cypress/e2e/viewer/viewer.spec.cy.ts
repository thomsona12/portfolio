describe('expense viewer test', () => {
    it('visits the root', () => {
    cy.visit('/');
    });
    it('clicks the menu button expenses option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'viewer').click();
    });
    it('selects an employee', () => {
    cy.wait(500);
    cy.get('mat-select[formcontrolname="employeeid"]').click();
    cy.contains('Thomson').click();
    });
    it('selects an report', () => {
    cy.wait(500);
    cy.get('mat-select[formcontrolname="reportid"]').click();
    cy.contains('2022').click();
    });
    it('confirms report added', () => {
    cy.contains('Total');
    });
   });
   