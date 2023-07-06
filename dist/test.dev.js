"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// class Books {
//   book = ['sahhs'];
//   constructor() {
//     this.book = ['sahhs'];
//     const form = document.getElementById('form');
//     form.addEventListener('submit', this.storeData);
//   }
//   displayData() {
//     console.log(this.book);
//   }
//   storeData(event) {
//     event.preventDefault();
//     // this.displayData();
//     console.log(this.book);
//   }
// }
// const bookw = new Books();
// // bookw.displayData();
// class Book {
//   constructor(title, author) {
//     this.title = title;
//     this.author = author;
//   }
// }
var BookManager =
/*#__PURE__*/
function () {
  function BookManager() {
    _classCallCheck(this, BookManager);

    this.books = [];
    this.id = 0;
    this.form = document.getElementById('form');
    this.bookSection = document.getElementById('books');
    this.initialize();
  }

  _createClass(BookManager, [{
    key: "initialize",
    value: function initialize() {
      this.form.addEventListener('submit', this.callbackFunction.bind(this));
      this.displayData();
    }
  }, {
    key: "displayData",
    value: function displayData() {
      var _this = this;

      var storedBooks = localStorage.getItem('books');
      this.books = storedBooks ? JSON.parse(storedBooks) : [];
      this.bookSection.innerHTML = '';
      this.books.forEach(function (book, index) {
        var bookElement = document.createElement('div');
        bookElement.innerHTML = "\n        <p id=\"title\">".concat(book.title, "</p>\n        <p id=\"author\">").concat(book.author, "</p>\n        <button class='btn' onclick='bookManager.removeBook(").concat(index, ")'>Remove</button>\n        <hr />");

        _this.bookSection.appendChild(bookElement);
      });
    }
  }, {
    key: "callbackFunction",
    value: function callbackFunction(event) {
      event.preventDefault();
      var myFormData = new FormData(event.target);
      var formDataObj = {};
      myFormData.forEach(function (value, key) {
        formDataObj[key] = value;
      });
      this.id += 1;
      formDataObj = _objectSpread({}, formDataObj, {
        id: this.id
      });
      this.books.push(formDataObj);
      var storedBook = JSON.stringify(this.books);
      localStorage.setItem('books', storedBook);
      this.displayData();
    }
  }, {
    key: "removeBook",
    value: function removeBook(index) {
      this.books.splice(index, 1);
      var storedBook = JSON.stringify(this.books);
      localStorage.setItem('books', storedBook);
      this.displayData();
    }
  }]);

  return BookManager;
}();

var bookManager = new BookManager();