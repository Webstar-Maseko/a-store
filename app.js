require("dotenv").config();
const exp = require("express");
const bp = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const mong = require("mongoose");
const passportL = require("passport-local-mongoose")
const app = exp();


const port = process.env.Port || 3000;
const moncon= process.env.Mongoose || "mongodb://localhost:27017/eCommerce";


app.use(bp.urlencoded({extended: true}));
app.use(session({secret:process.env.secret, resave:false, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bp.json());


mong.connect(moncon, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false}).then(() => {
    console.log("connected to database");
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
}).catch(err => console.log(err));

