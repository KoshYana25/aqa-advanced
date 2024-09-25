export class Book {
    constructor (name, author, published_year) {
        this.name = name;
        this.author = author;
        this.published_year = published_year;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('Name must be a non-empty string');
        }
        this._name = value;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error('Author must be a non-empty string');
        }
        this._author = value;
    }

    get published_year() {
        return this._published_year;
    }

    set published_year(value) {
        if (typeof value !== 'number' || value < 0) {
            throw new Error('Published year must be a non-negative number');
        }
        this._published_year = value;
    }

    printInfo() {
        console.log(`Book name is ${this.name}, author is ${this.author}, published year is ${this.published_year}`);
    }

    static findOldestBook(books) {
        return books.reduce((oldestBook, currentBook) => {
            return (currentBook.published_year < oldestBook.published_year) ? currentBook : oldestBook;
        });
    }
}







