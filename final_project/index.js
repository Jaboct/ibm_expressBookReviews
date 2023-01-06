const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const auth_users = require('./router/auth_users.js');
const customer_routes = auth_users.authenticated;
//const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;


const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here

    console.log ( "req.header ", req.header );
    console.log ( "req.session ", req.session );

    next ( );

/*
	let tkn = req.header("Authorization");
	console.log ( "tkn", tkn );
	if ( tkn ) {
        // first i need to authenticate it?
        const verificationStatus =
            jwt.verify ( tkn, auth_users.JWT_SECRET );
    //    	jwt.verify ( tokenValue, JWT_SECRET );
        console.log ( "verificationStatus: ", verificationStatus );
    next ( );
    } else {
        res.end ( "tkn failure" );
    }
*/
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running on PORT:",PORT));
