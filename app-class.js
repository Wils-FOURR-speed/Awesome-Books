class BookManager {
  constructor() {
    this.books = [];
    this.id = 0;
    this.form = document.getElementById('form');
    this.bookSection = document.getElementById('books');
    this.list = document.getElementById('list');
    this.addNew = document.getElementById('addnew');
    this.contact = document.getElementById('contact');
    this.initialize();
  }

  displayList() {
    this.bookSection = document.getElementById('books');
    this.createBook = document.getElementById('createBook');
    this.contactInfo = document.getElementById('contactinfo');
    this.createBook.style.display = 'none';
    this.bookSection.style.display = 'flex';
    this.contactInfo.style.display = 'none';
  }

  displayForm() {
    this.bookSection = document.getElementById('books');
    this.createBook = document.getElementById('createBook');
    this.contactInfo = document.getElementById('contactinfo');
    this.hr = document.getElementById('hr');
    this.createBook.style.display = 'flex';
    this.bookSection.style.display = 'none';
    this.contactInfo.style.display = 'none';
    this.hr.style.display = 'none';
  }

  displayContact() {
    this.bookSection = document.getElementById('books');
    this.createBook = document.getElementById('createBook');
    this.contactInfo = document.getElementById('contactinfo');
    this.contactInfo.style.display = 'flex';
    this.createBook.style.display = 'none';
    this.bookSection.style.display = 'none';
  }

  initialize() {
    this.list.addEventListener('click', this.displayList);
    this.addNew.addEventListener('click', this.displayForm);
    this.contact.addEventListener('click', this.displayContact);
    this.form.addEventListener('submit', this.callbackFunction.bind(this));
    this.displayData();
  }

  displayData() {
    const storedBooks = localStorage.getItem('books');
    this.books = storedBooks ? JSON.parse(storedBooks) : [];
    this.bookSection.innerHTML = '';

    this.books.forEach((book, index) => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book');
      bookElement.innerHTML = `
        <p id="title">"${book.title}" by ${book.author}</p>
        <button class='btn' onclick='bookManager.removeBook(${index})'>Remove</button>`;
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