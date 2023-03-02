describe("employee page test", () => {
    it("visits the root", () => {
    cy.visit("/");
    });
    it("clicks the menu button employees option", () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'employees').click();
    });
    it("shows employees were loaded", () => {
    cy.contains('employees loaded!!');
    });
   });