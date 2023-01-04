const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const JWT_SECRET = "aSecretString";

const isValid = (username)=>{ //returns boolean
    // write code to check is the username is valid
    for ( i in users ) {
        var user = users[i];
        if ( user.name == username ) {
            return 0;
        }
    }
    return 1;
}

/*
const authenticatedUser = (username,password)=>{ //returns boolean
    //write code to check if username and password match the one we have in records.
    if ( !username ||
        username === "" ) {
       //return res.status(400).json({message: "Username is empty"});
       return 4;
   }
   if ( !password ||
    password === "" ) {
       //return res.status(400).json({message: "Password is empty"});
       return 3;
   }

   for ( i in users ) {
       var user = users[i];
       if ( user.name == username && 
            user.pass == password ) {
           // both were successfully matched.
           return 2;
       } else {
//           return res.status(400).json({message: "Username or password failed."});
            return 1;
       }
   }
//   return res.status(400).end( "User or Password did not match" );
   return 0;
};

//only registered users can login
regd_users.post("/login", (req,res) => {
    console.log ( "post /login" );
    var name = req.body.username;
    var pass = req.body.password;
    var ret = authenticatedUser ( name, pass );
    if ( ret == 0 ) {
        return res.status(400).end( "User or Password did not match" );        
    } else if ( ret == 1 ) {
        return res.status(400).json({message: "Username or password failed."});
    } else if ( ret == 2 ) {
        var token = jwt.sign({name: name}, JWT_SECRET);
        user.token = token;
        return res.json({
            token: token,
        });
    } else if ( ret == 3 ) {
        return res.status(400).json({message: "Password is empty"});
    } else if ( ret == 4 ) {
        return res.status(400).json({message: "Username is empty"});
    }
});
*/

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
//  return res.status(300).json({message: "Yet to be implemented"});
/*
    var isbn = req.params.isbn;
    for ( i in books ) {
        var book = books[i];
        if ( book.isbn == isbn ) {
            var book = books[i];
//            return res.status(200).end(JSON.stringify(book));
            // look through this books reviews, if 
            for ( r in book.reviews ) {
                console.log ( book.reviews[i] );
                if ( book.reviews.user == req.)
            }
        }
    }
*/
    return res.status(400).end("ISBN could not be found.");
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
