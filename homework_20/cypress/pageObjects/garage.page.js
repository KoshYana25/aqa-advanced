class GaragePage {
  // Локатори
  get addCarButton() {
    return cy.get('button[class="btn btn-primary"]').contains("Add car"); // Кнопка "Add a car"
  }

  get brandDropdown() {
    return cy.get('select[id="addCarBrand"]'); // Випадаючий список для "Brand"
  }

  get modelDropdown() {
    return cy.get('select[id="addCarModel"]'); // Випадаючий список для "Model"
  }

  get mileageInput() {
    return cy.get('input[id="addCarMileage"]'); // Поле для введення "Mileage"
  }

  get saveCarButton() {
    return cy
      .get(".btn-primary")
      .filter((index, element) => element.textContent.trim() === "Add")
      .click();
  }

  // Методи
  addCar(brand, model, mileage) {
    this.addCarButton.click(); // Натискаємо "Add a car"
    this.brandDropdown.select(brand); // Обираємо марку машини
    this.modelDropdown.select(model); // Обираємо модель машини
    this.mileageInput.type(mileage); // Вводимо пробіг
    this.saveCarButton.click(); // Натискаємо "Add"
  }
}

export const garagePage = new GaragePage();
