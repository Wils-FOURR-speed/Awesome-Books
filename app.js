let books = [];
let id = 0;

const form = document.getElementById('form');
function displayData() {
  books = JSON.parse(localStorage.getItem('books'));
  const bookSection = document.getElementById('books');
  bookSection.innerHTML = ''; // Clear the existing content
  books.forEach((book, index) => {
    const bookElement = document.createElement('div');
    bookElement.innerHTML = `
      <p id="title">${book.title}</p>
      <p id="author">${book.author}</p>
      <button class='btn' onclick='removeBook(${index})'>Remove</button>
      <hr />`;
    bookSection.appendChild(bookElement);
  });
}
function callbackFunction(event) {
  event.preventDefault();
  const myFormData = new FormData(event.target);
  let formDataObj = {};
  myFormData.forEach((value, key) => {
    formDataObj[key] = value;
  });
  id += 1;
  formDataObj = { ...formDataObj, id };
  books.push(formDataObj);
  const storedBook = JSON.stringify(books);
  localStorage.setItem('books', storedBook);
  displayData();
}

form.addEventListener('submit', callbackFunction);

// eslint-disable-next-line no-unused-vars
function removeBook(index) {
  books.splice(index, 1);
  const storedBook = JSON.stringify(books);
  localStorage.setItem('books', storedBook);
  displayData();
}

// eslint-disable-next-line consistent-return
window.onload = () => {
  if (!books) {
    return 0;
  }
  displayData();
};
