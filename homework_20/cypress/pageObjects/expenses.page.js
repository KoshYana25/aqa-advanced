class ExpensesPage {
  // Локатори
  get addExpenseButton() {
    return cy.contains(".car_add-expense.btn.btn-success", "Add fuel expense");
  }

  get vehicleDropdown() {
    return cy.get('select[id="addExpenseCar"]');
  }

  get reportDateInput() {
    return cy.get('input[id="addExpenseDate"]');
  }

  get mileageInput() {
    return cy.get('input[id="addExpenseMileage"]');
  }

  get litersInput() {
    return cy.get('input[id="addExpenseLiters"]');
  }

  get totalCostInput() {
    return cy.get('input[id="addExpenseTotalCost"]');
  }

  get saveExpenseButton() {
    return cy
      .get(".btn-primary")
      .filter((_, el) => el.textContent.trim() === "Add");
  }

  // Методи
  addFuelExpense(vehicle, date, mileage, liters, totalCost) {
    this.addExpenseButton.click(); // Натискаємо кнопку додавання витрати
    this.vehicleDropdown.select(vehicle); // Вибираємо транспортний засіб
    this.reportDateInput.clear().type(date); // Встановлюємо дату
    this.mileageInput.clear().type(mileage); // Вводимо пробіг
    this.litersInput.clear().type(liters); // Вводимо кількість літрів
    this.totalCostInput.clear().type(totalCost); // Вводимо загальну вартість
    this.saveExpenseButton.click(); // Натискаємо кнопку збереження
  }
}

export const expensesPage = new ExpensesPage();
