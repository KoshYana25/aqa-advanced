import fetch from 'node-fetch';


// Клас для роботи з Todo
class TodoService {
    
    async getTodo() {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
}

// Клас для роботи з User
class UserService {
    
    async getUser() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
}

// Клас для роботи з обома сервісами
class DataFetcher {
    constructor(todoService, userService) {
        this.todoService = todoService;
        this.userService = userService;
    }

    // Використання Promise.all для отримання об'єктів todo та user
    async fetchData() {
        try {
            const [todo, user] = await Promise.all([
                this.todoService.getTodo(),
                this.userService.getUser()
            ]);
            console.log('Todo:', todo);
            console.log('User:', user);
        } catch (error) {
            console.error('Error in Promise.all:', error);
        }
    }

    // Використання Promise.race для отримання першого з об'єктів
    async fetchFirst() {
        try {
            const result = await Promise.race([
                this.todoService.getTodo(),
                this.userService.getUser()
            ]);
            console.log('First resolved promise result:', result);
        } catch (error) {
            console.error('Error in Promise.race:', error);
        }
    }
}

// Створення інстансів класів
const todoService = new TodoService();
const userService = new UserService();
const dataFetcher = new DataFetcher(todoService, userService);

// Виклики
dataFetcher.fetchData();
dataFetcher.fetchFirst();
