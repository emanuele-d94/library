class Book{
    id;
    title;
    author;
    pages;
    isRead;

    constructor(title, author, pages, isRead) {
        this.id = crypto.randomUUID()
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }

    changeReadStatus() {
        if (this.isRead){
            this.isRead = false;
        } else {
            this.isRead = true;
        }
    }

}

class Library{
    books;

    constructor(){
        this.books = [];
    }

    addBook(book){
        this.books.push(book);
    }

// Metodo per rimuovere l'elemento tramite ID
    removeBookById(idToRemove) {
        this.books = this.books.filter(book => book.id !== idToRemove);
    }
}

const library = new Library();
const book1 = new Book("Super Mario Bros","Mario",500,true);
const book2 = new Book("Super Mario Bros","Mario",500,true);
const book3 = new Book("Super Mario Bros","Mario",500,true);
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

const openDialogButton = document.querySelector(".open-dialog");
const dialog = document.querySelector(".add-book-dialog");

openDialogButton.addEventListener("click", () => {
    dialog.showModal()
})

const closeBtn = document.querySelector('.close-dialog-button');
closeBtn.addEventListener('click', () => {
    dialog.close();
});

const addBookForm = document.querySelector('.add-book-form');
addBookForm.addEventListener("submit", () => {
    // 1. Estraiamo i dati dal form
    const formData = new FormData(addBookForm);
    // Recuperiamo i valori usando l'attributo 'name' degli input
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const isRead = formData.get('read') === 'on'; // I checkbox restituiscono 'on' se spuntati

    const book = new Book(title, author, pages, isRead);
    library.addBook(book);
    updateLibrary()

})

let htmlLibrary = document.querySelector(".library");

function updateLibrary(){

    // SVUOTO PRIMA TUTTO E POI RIEMPIO
    htmlLibrary.innerHTML = "";

    library.books.forEach((book)=> {
        // 1. Creo l'elemento contenitore
        const newBook = document.createElement('div');
        newBook.classList.add('book'); // Aggiungo una classe per il CSS

        const newContent = document.createElement('div');
        newContent.classList.add('content'); // Aggiungo una classe per il CSS

        // 2. Creo i paragrafi
        const pId = document.createElement('p');
        pId.classList.add('id');
        pId.innerHTML = `ID: ${book.id}`;

        const pTitle = document.createElement('p');
        pTitle.innerHTML = `Title: ${book.title}`;

        const pAuthor = document.createElement('p');
        pAuthor.innerHTML = `Author: ${book.author}`;

        const pPages = document.createElement('p');
        pPages.innerHTML = `Pages: ${book.pages}`;

        const pRead = document.createElement('p');
        if (book.isRead) {
            pRead.innerHTML = `Read: Yes`;
        } else {
            pRead.innerHTML = `Read: No`;
        }

        // 3. Monto i pezzi: aggiungo i p al div
        newContent.appendChild(pId);
        newContent.appendChild(pTitle);
        newContent.appendChild(pAuthor);
        newContent.appendChild(pPages);
        newContent.appendChild(pRead);

        // 4. Creo i bottoni:
        const newButtons = document.createElement('div');
        newButtons.classList.add('book-buttons');

        const read = document.createElement('button');
        read.classList.add('read');
        read.title = "Change read status";
        read.innerHTML = "✔️";

        read.addEventListener('click', () => {
            book.changeReadStatus(!book.isRead);
            updateLibrary();
        })

        const remove = document.createElement('button');
        remove.classList.add('remove');
        remove.title = "Remove book";
        remove.innerHTML = "❌";

        remove.addEventListener('click', () => {
            library.removeBookById(book.id);
            updateLibrary();
        })

        newButtons.appendChild(read);
        newButtons.appendChild(remove);

        // 5. Aggiungo a libro il contenuto e i bottoni
        newBook.appendChild(newContent);
        newBook.appendChild(newButtons);

        // 6. Aggiungo il libro alla libreria
        htmlLibrary.appendChild(newBook);
    })
}

function main() {
    updateLibrary();
}

main();