import fetch from 'node-fetch';

function getToDo() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log("Error:", error);
        });
}

getToDo();



// Функція для отримання об'єкта user
function getUser() {
    return fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

// Використання Promise.all для отримання об'єктів todo та user
Promise.all([getToDo(), getUser()])
    .then(([todo, user]) => {
        console.log('Todo:', todo);
        console.log('User:', user);
    })
    .catch(error => {
        console.error('Error in Promise.all:', error);
    });

// Використання Promise.race для отримання першого з об'єктів
Promise.race([getToDo(), getUser()])
    .then(result => {
        console.log('First resolved promise result:', result);
    })
    .catch(error => {
        console.error('Error in Promise.race:', error);
    });
