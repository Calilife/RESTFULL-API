const setEditModal = (isbn) => {
    // reading ISBN from URL
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/book/${isbn}`, false);
    xhttp.send();

    const book = JSON.parse(xhttp.responseText);

    const {
        title
    } = book;

    console.log(isbn);
    console.log(title);
    //filling information about the book in the form inside the modal
    document.getElementById('isbn').value = isbn;
    document.getElementById('title').value = title;

    //setting up the action url for the book 
    document.getElementById('editForm').action = `http://localhost:3000/booking/${isbn}`;
}

const deleteBook = (isbn) => {
    const xhttp = new XMLHttpRequest();
    console.log(isbn);
    xhttp.open("DELETE", `http://localhost:3000/book/${isbn}`, false);
    xhttp.send();

    //Reloading the page
    location.reload();
}

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/books", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);

    for (let book of books) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>
                        <hr>

                        <button type="button" class="btn btn-danger" onClick="deleteBook(${book.isbn})">Delete</button>

                        <button types="button" class="btn btn-primary" data-toggle="modal" 
                            data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
    }
}

loadBooks();


