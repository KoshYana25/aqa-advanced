const car1 = {
    brand: "Audi",
    model: "Q5",
    year: 2022
}

const car2 = {
    brand: "BMW",
    model: "M3",
    year: 2023
}

const car3 = { 
    ...car1,
    ...car2
}

console.log(car3);