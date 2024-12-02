class GaragePage {
    // Локатори
    get addCarButton() {
      return cy.get('button[class="btn btn-primary"]').contains("Add car"); 
    }
  
    get brandDropdown() {
      return cy.get('select[id="addCarBrand"]'); 
    }
  
    get modelDropdown() {
      return cy.get('select[id="addCarModel"]'); 
    }
  
    get mileageInput() {
      return cy.get('input[id="addCarMileage"]'); 
    }
  
    get saveCarButton() {
      return cy
        .get(".btn-primary")
        .filter((index, element) => element.textContent.trim() === "Add");
    }
  
    // Методи
    addCar(brand, model, mileage) {
      this.addCarButton.should('be.visible').click();
      
      this.brandDropdown.select(brand);
      this.modelDropdown.select(model);
      this.mileageInput.type(mileage);
  
      
      this.saveCarButton.click();
    }
  }
  
  export const garagePage = new GaragePage();
  