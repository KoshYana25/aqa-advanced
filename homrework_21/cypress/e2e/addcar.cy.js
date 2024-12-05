import { garagePage } from "../pageObjects/garage.page";

describe("Garage Tests", () => {
  let carId; // Змінна для збереження id створеної машини

  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"), {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });

    cy.get("button.btn-outline-white.header_signin")
      .contains("Sign In")
      .click();

    // Логін
    cy.get('input[id="signinEmail"]').type(Cypress.config("email"));
    cy.get('input[id="signinPassword"]').type(Cypress.config("password"));
    cy.get(".btn-primary").contains("Login").click();
  });

  it("should add a new car to the garage and validate it using filter", () => {
    // Перехоплюємо запит на створення машини
    cy.intercept('POST', '/api/cars').as('addCarRequest');

    // Використання методу для додавання машини
    garagePage.addCar("Audi", "TT", "10000");

    // Чекаємо завершення запиту на додавання машини та збереження id
    cy.wait('@addCarRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(201); 
      carId = interception.response.body.id; // Збереження id машини
      cy.log('Created Car ID:', carId); 

       // Зберігаємо carId у фікстурі
       cy.writeFile('cypress/fixtures/carId.json', { carId });
    });

    
    cy.reload();

    cy.wait(2000); 

    
    cy.request({
      method: 'GET',
      url: 'https://qauto.forstudy.space/api/cars', // API для отримання списку машин
    }).then((response) => {
      // Логування для перевірки структури відповіді
      cy.log('Response Body:', JSON.stringify(response.body));

    
      expect(response.body).to.have.property('data').that.is.an('array'); 

      // Фільтруємо список машин за параметрами
      const createdCar = response.body.data.find(car => {
        return car.carBrandId === 1 &&
               car.carModelId === 1 &&
               car.initialMileage === 10000 &&
               car.mileage === 10000 &&
               car.brand === "Audi" &&
               car.model === "TT";
      });

      // Логування знайденої машини
      cy.log('Found Car:', JSON.stringify(createdCar)); 

      // Перевірка, що машина є в списку
      expect(createdCar).to.exist; 
      expect(createdCar.brand).to.eq("Audi"); 
      expect(createdCar.model).to.eq("TT"); 
      expect(createdCar.initialMileage).to.eq(10000); 
      expect(createdCar.mileage).to.eq(10000); 
      expect(createdCar.carBrandId).to.eq(1); 
      expect(createdCar.carModelId).to.eq(1); 



    });
  });
});
