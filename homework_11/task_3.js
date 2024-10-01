import fetch from 'node-fetch';

// Функція для отримання об'єкта todo
async function getTodo() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

// Функція для отримання об'єкта user
async function getUser() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

// Використання Promise.all для отримання об'єктів todo та user
async function fetchData() {
    try {
        const [todo, user] = await Promise.all([getTodo(), getUser()]);
        console.log('Todo:', todo);
        console.log('User:', user);
    } catch (error) {
        console.error('Error in Promise.all:', error);
    }
}

// Використання Promise.race для отримання першого з об'єктів
async function fetchFirst() {
    try {
        const result = await Promise.race([getTodo(), getUser()]);
        console.log('First resolved promise result:', result);
    } catch (error) {
        console.error('Error in Promise.race:', error);
    }
}

// Виклик
fetchData();
fetchFirst();
