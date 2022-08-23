const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

var books = [
    {
        "isbn": "1",
        "title": "seb"
    },
    {
        "isbn": "3",
        "title": "ang"
    }
];

app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.post('/book', (req, res) => {
    // ill be working here with code
    const book = req.body;

    console.log(book);
    books.push(book);

    res.send('Book is added to the database');

});

app.get('/books', (req, res) => {
    res.json(books);

});

app.get('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }
    //sending when book is not found
    res.status(404).send('Book not found');
});

app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }
        return false;
    });
    res.send(`Book was Deleted. ID:${isbn}`);
});

app.post('/booking/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const newBook = req.body;
    console.log(isbn);
    console.log(newBook);
    //remove item from the books array
    for (let i = 0; i < books.length; i++) {
        let book = books[i];

        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }
    res.send("Book was edited")
});

app.listen(port, () => console.log(`hello word app listening ${port}`));

