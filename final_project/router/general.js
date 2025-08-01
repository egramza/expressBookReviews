const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
/*
public_users.get('/',function (req, res) {

    res.send(JSON.stringify(books, null, 4));

});
*/

// Get book details based on ISBN

/*
public_users.get('/isbn/:isbn',function (req, res) {

    const isbn = req.params.isbn;
    res.send(books[isbn]);

 });
*/
// Get book details based on author

/*
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const matchingBooks = [];

    // Get all book IDs (keys of the books object)
    const bookKeys = Object.keys(books);

    // Iterate through all books to find matches
    bookKeys.forEach(key => {
        if (books[key].author === author) {
        matchingBooks.push(books[key]);
        }
    });

    if (matchingBooks.length > 0) {
        res.send(matchingBooks)
    } else {
        res.send("No books found");
    }
});
*/

// Get all books based on title
/*
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const matchingBooks = [];

    // Get all book IDs (keys of the books object)
    const bookKeys = Object.keys(books);

    // Iterate through all books to find matches
    bookKeys.forEach(key => {
        if (books[key].title === title) {
        matchingBooks.push(books[key]);
        }
    });

    if (matchingBooks.length > 0) {
        res.send(matchingBooks)
    } else {
        res.send("No books found");
    }
});
*/

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    const book = books[isbn];

    if (book) {
        res.send(book.reviews);
    } else {
        res.send("No review found")
    }
});

// TASK 10 - Get the book list available in the shop using Promises
public_users.get('/books',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });

      get_books.then(() => console.log("Promise for Task 10 resolved"));

});

public_users.get('/isbn/:isbn',function (req, res) {

    const isbn = req.params.isbn;
    
    const get_isbn = new Promise((resolve, reject) => {
        resolve(res.send(books[isbn]));
    });

    get_isbn.then(() => console.log("Promise for Task 11 resolved"))

 });

// TASK 12 - Get book details based on author
public_users.get('/books/author/:author',function (req, res) {

    const get_books_author = new Promise((resolve, reject) => {

    let booksbyauthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        booksbyauthor.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
      resolve(res.send(JSON.stringify({booksbyauthor}, null, 4)));
      }


    });
    reject(res.send("The mentioned author does not exist "))
        
    });

    get_books_author.then(function(){
            console.log("Promise for task 12 is resolved");
   }).catch(function () { 
                console.log('The mentioned author does not exist');
  });

  });

public_users.get('/title/:title',function (req, res) {
    
    const get_books_title = new Promise((resolve, reject)=> {
        let foundTitle = [];
        let isbns = Object.keys(books);

        isbns.forEach((isbn) => {
            if(books[isbn]["title"] === req.params.title) {
                foundTitle.push({"isbn":isbn,
                                "author":books[isbn]["author"],
                                "title":books[isbn]["title"],
                                "reviews":books[isbn]["reviews"]});
                resolve(res.send(JSON.stringify({foundTitle}, null, 4)));
            }
        });
        reject(res.send("The mentioned title doesn't exist"))

    });

    get_books_title.then(function(){
        console.log("Promise for task 13 is resolved.");
    }).catch(function(){
        console.log("The mentioned title doesn't exist!");
    })
});

module.exports.general = public_users;
