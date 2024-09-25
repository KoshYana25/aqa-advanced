import { Book } from './Book.js';
import { EBook } from './EBook.js';


const book1 = new Book('Walking with grandfather', 'Joseph Marshal', 2021);
const book2 = new Book('Black elk speaks', "John Neihardt", 2005);
const book3 = new Book('Dear Sandy', 'Yarin Marlly', 2017);

const ebook1 = new EBook('The long run', 'Sherman Alexie', 2019, 'EPUB');
const ebook2 = new EBook('The Sacred Pipe', 'Joseph Brown', 2022, 'GIF');
const ebook3 = new EBook('The long death', 'Ralph Andrist', 2015, 'JPEG');


book1.printInfo();
book2.printInfo();
book3.printInfo();

ebook1.printInfo();
ebook2.printInfo();
ebook3.printInfo();



const books = [book1, book2, book3, ebook1, ebook2, ebook3];
const oldestBook = Book.findOldestBook(books);
console.log('The oldest book', oldestBook);



const newEBook = EBook.fromBook(book1, 'PDF');
console.log('Changed to new EBook:', newEBook);
