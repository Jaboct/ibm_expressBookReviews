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

const authenticatedUser = (username,password)=>{ //returns boolean
    //write code to check if username and password match the one we have in records.
    var ret = {
        status: 400,
        message: "Failed",
    };
    if ( !username ||
        username === "" ) {
        ret.status = 400;
        ret.message = "Username is empty.";
        //return res.status(400).json({message: "Username is empty"});
        return ret;
    }
    if ( !password ||
         password === "" ) {
        //return res.status(400).json({message: "Password is empty"});
        ret.status = 400;
        ret.message = "Password is empty.";
        return ret;
    }

    for ( i in users ) {
        var user = users[i];
        if ( user.name == username &&
            user.pass == password ) {
            // both were successfully matched.
            ret.status = 200;
            var token = jwt.sign({name: username}, JWT_SECRET);
            user.token = token;
            ret.token = token;
            ret.message = "Success.";
            return ret;
        } else {
//          return res.status(400).json({message: "Username or password failed."});
            ret.message = "Username or password failed.";
            return ret;
        }
    }
//   return res.status(400).end( "User or Password did not match" );
    return ret;
};

//only registered users can login
regd_users.post("/login", (req,res) => {
    console.log ( "post /login" );
    var name = req.body.username;
    var pass = req.body.password;
    var ret = authenticatedUser ( name, pass );
    if ( res.token ) {
        return res.status(ret.status).json(res.token);
    }
    return res.status(ret.status).json({message: ret.message});
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
//  return res.status(300).json({message: "Yet to be implemented"});
    console.log ( "put /auth/review/:isbn" );

    var username = "user";
    var reviewText = "review";

    var isbn = req.params.isbn;
    for ( i in books ) {
//        var book = books[i];
//        if ( book.isbn == isbn ) {
        if ( i == isbn ) {
            var book = books[i];
//            return res.status(200).end(JSON.stringify(book));
            // look through this books reviews, if this user already has one, then replace it, if not then add the new one.
            var replaced = 0;
            for ( r in book.reviews ) {
                var review = book.reviews[r];
//                console.log ( book.reviews[i] );
                if ( review.user == username ) {
                    console.log ( "replace old" );
                    review.review = review;

                    replaced = 1;
                    break;
                }
            }
            if ( !replaced ) {
                var obj = {
                    user : username,
                    review : reviewText,
                };
                (book.reviews).push ( obj );
//                book.reviews.push ( obj );
                console.log ( "push new" );
            }
            printReviews ( book );
            return res.status(400).end("Book found.");
        }
    }


    return res.status(400).end("ISBN could not be found.");
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    console.log ( "delete /auth/review/:isbn" );


    var username = "user";
    var reviewText = "review";

    var isbn = req.params.isbn;
    for ( i in books ) {
//        var book = books[i];
//        if ( book.isbn == isbn ) {
        if ( i == isbn ) {
            var book = books[i];
//            return res.status(200).end(JSON.stringify(book));
            // look through this books reviews, if this user already has one, then replace it, if not then add the new one.
            var removed = 0;
            for ( r in book.reviews ) {
                var review = book.reviews[r];
//                console.log ( book.reviews[i] );
                if ( review.user == username ) {
                    console.log ( "delete their review." );
                    // found user, delete this review.
                    // review.review = review;
                    book.reviews.splice ( r, 1 );

                    removed = 1;
                    break;
                }
            }
            if ( !removed ) {
                console.log ( "review not found" );
            }
            printReviews ( book );
            return res.status(400).end("Book found.");
        }
    }
    return res.status(400).end("ISBN could not be found.");
});


function printReviews ( book ) {
    console.log ( "printReviews ( )" );
    console.log ( "book.title:", book.title )
    for ( r in book.reviews ) {
        var review = book.reviews[r];
        console.log ( review.user, " : ", review.review );
    }
}


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.JWT_SECRET = JWT_SECRET;