class BookManager {
  constructor() {
    this.books = [];
    this.id = 0;
    this.form = document.getElementById('form');
    this.bookSection = document.getElementById('books');

    this.initialize();
  }

  initialize() {
    this.form.addEventListener('submit', this.callbackFunction.bind(this));
    this.displayData();
  }

  displayData() {
    const storedBooks = localStorage.getItem('books');
    this.books = storedBooks ? JSON.parse(storedBooks) : [];
    this.bookSection.innerHTML = '';

    this.books.forEach((book, index) => {
      const bookElement = document.createElement('div');
      bookElement.innerHTML = `
        <p id="title">${book.title}</p>
        <p id="author">${book.author}</p>
        <button class='btn' onclick='bookManager.removeBook(${index})'>Remove</button>
        <hr />`;
      this.bookSection.appendChild(bookElement);
    });
  }

  callbackFunction(event) {
    event.preventDefault();
    const myFormData = new FormData(event.target);
    let formDataObj = {};
    myFormData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    this.id += 1;
    formDataObj = { ...formDataObj, id: this.id };
    this.books.push(formDataObj);
    const storedBook = JSON.stringify(this.books);
    localStorage.setItem('books', storedBook);
    this.displayData();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    const storedBook = JSON.stringify(this.books);
    localStorage.setItem('books', storedBook);
    this.displayData();
  }
}

// eslint-disable-next-line no-unused-vars
const bookManager = new BookManager();