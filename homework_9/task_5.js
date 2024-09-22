const users = [
    {name: "Relly", lastName: "Rend", age: 34},
    {name: "Marry", lastName: "Sand", age: 22},
    {name: "Felly", lastName: "Dend", age: 18},
    {name: "Delly", lastName: "Meld", age: 19}
]


for(const person of users){
    const { name, email, age } = users;
    console.log(`${person.name} ${person.lastName} is ${person.age} years old`)
}