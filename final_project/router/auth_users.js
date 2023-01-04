const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

//const JWT_SECRET = "aSecretString";

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

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    console.log ( "post /login" );
//    console.log ( "req: ", req );
//    console.log ( "req.secret: ", req.secret );
    console.log ( "req.session: ", req.session );
    console.log ( "req.session.secret: ", req.session.secret );
    console.log ( "session.secret: ", session.secret );
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

    for ( i in users ) {
        var user = users[i];
        if ( user.name == name && 
             user.pass == pass ) {
            // both were successfully matched.
            var token = jwt.sign({name: name}, JWT_SECRET);
            user.token = token;
            return res.json({
                token: token,
            });
        } else {
            return res.status(400).json({message: "Username or password failed."});
        }
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
