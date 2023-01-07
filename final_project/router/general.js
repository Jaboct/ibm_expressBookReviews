const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
//const auth_users = require("./auth_users.js");
//let users = auth_users.users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    console.log ( "post /register ran" );
    console.log ( "req.body", req.body );
  //Write your code here
//  return res.status(300).json({message: "Yet to be implemented"});
    var name = req.body.username;
    var pass = req.body.password;
    if ( !name ||
         name === "" ) {
        return res.status(400).json({message: "Username is empty"});
    }
    if ( !pass ||
         pass === "" ) {
        return res.status(400).json({message: "Password is empty"});
    }

    if ( isValid(name) ) {
        var user = {
            name:name,
            pass:pass,
        }
        users.push ( user );
        return res.status(400).json({message: "[" + name + "] Registered Successfully."});
    } else {
        return res.status(400).json({message: "Username is already in use"});
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    // non-promise [Task 1]
//    return res.status(200).end(JSON.stringify(books));

    /// Promises

    // promise [Task 10]
    let myPromise = new Promise((resolve,reject) => {
        resolve ( books );
    });
    myPromise.then((books) => {
        if ( books ) {
            return res.status(200).end(JSON.stringify(books));
        } else {
            return res.status(200).end ( "book array not found." );
        }
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    // non-promise [Task 2]
/*
    var isbn = req.params.isbn;
    for ( i in books ) {
        var book = books[i];
        if ( book.isbn == isbn ) {
            var book = books[i];
            return res.status(200).end(JSON.stringify(book));
        }
    }
    return res.status(400).end("ISBN could not be found.");
*/
    // promise [Task 11]
    let myPromise = new Promise((resolve,reject) => {
        resolve ( books );
    });
    myPromise.then((books) => {
        var isbn = req.params.isbn;
        for ( i in books ) {
            var book = books[i];
            if ( book.isbn == isbn ) {
                var book = books[i];
                return res.status(200).end(JSON.stringify(book));
            }
        }
        return res.status(400).end("ISBN could not be found.");
    })
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    // non-promise [Task 3]
    var author = req.params.title;
/*
    for ( i in books ) {
        var book = books[i];
        if ( book.author == author ) {
            var book = books[i];
            return res.status(200).end(JSON.stringify(book));
        }
    }
    return res.status(400).end("Author could not be found.");
*/
    // promise [Task 12]
    let myPromise = new Promise((resolve,reject) => {
        resolve ( books );
    });
    myPromise.then((books) => {
        for ( i in books ) {
            var book = books[i];
            if ( book.author == author ) {
                var book = books[i];
                return res.status(200).end(JSON.stringify(book));
            }
        }
        return res.status(400).end("Author could not be found.");
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    // [Task 4] non-promise
    var title = req.params.title;
/*
    for ( i in books ) {
        var book = books[i];
        if ( book.title == title ) {
            var book = books[i];
            return res.status(200).end(JSON.stringify(book));
        }
    }
    return res.status(400).end("Title could not be found.");
*/
    // promise [Task 13]
    let myPromise = new Promise((resolve,reject) => {
        resolve ( books );
    });
    myPromise.then((books) => {
        for ( i in books ) {
            var book = books[i];
            if ( book.title == title ) {
                var book = books[i];
                return res.status(200).end(JSON.stringify(book));
            }
        }
        return res.status(400).end("Title could not be found.");
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    // [Task 4] non-promise
    var isbn = req.params.isbn;
    for ( i in books ) {
        // var book = books[i];
        if ( i == isbn ) {
            var book = books[i];
            return res.status(200).end(JSON.stringify(book));
        }
    }
    return res.status(400).end("ISBN could not be found.");
});

module.exports.general = public_users;
