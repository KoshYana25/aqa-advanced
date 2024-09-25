import { Book } from './Book.js';

export class EBook extends Book {
    constructor(name, author, published_year, file_format = "JPEG") {
        super(name, author, published_year); 
        this._file_format = file_format; 
    }

    get file_format() {
        return this._file_format;
    }

    set file_format(value) {
        if (typeof value !== 'string') {
            throw new Error('File format must be a string');
        }
        this._file_format = value;
    }

    printInfo() {
        console.log(`Book name is ${this.name}, author is ${this.author}, published year is ${this.published_year}, file format is ${this.file_format}`);
    }

    static fromBook(book, format) {
        return new EBook(book.name, book.author, book.published_year, format);
    }
}



