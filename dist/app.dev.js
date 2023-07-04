"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var books = [];
var id = 0;
var form = document.getElementById('form');

function displayData() {
  books = JSON.parse(localStorage.getItem('books'));
  var bookSection = document.getElementById('books');
  bookSection.innerHTML = ''; // Clear the existing content

  books.forEach(function (book, index) {
    var bookElement = document.createElement('div');
    bookElement.innerHTML = "\n      <p id=\"title\">".concat(book.title, "</p>\n      <p id=\"author\">").concat(book.author, "</p>\n      <button class='btn' onclick='removeBook(").concat(index, ")'>Remove</button>\n      <hr />");
    bookSection.appendChild(bookElement);
  });
}

function callbackFunction(event) {
  event.preventDefault();
  var myFormData = new FormData(event.target);
  var formDataObj = {};
  myFormData.forEach(function (value, key) {
    formDataObj[key] = value;
  });
  id += 1;
  formDataObj = _objectSpread({}, formDataObj, {
    id: id
  });
  books.push(formDataObj);
  var storedBook = JSON.stringify(books);
  localStorage.setItem('books', storedBook);
  displayData();
}

form.addEventListener('submit', callbackFunction); // eslint-disable-next-line no-unused-vars

function removeBook(index) {
  books.splice(index, 1);
  var storedBook = JSON.stringify(books);
  localStorage.setItem('books', storedBook);
  displayData();
} // eslint-disable-next-line consistent-return


window.onload = function () {
  if (!books || books.length === 0) {
    return 0;
  }

  displayData();
};