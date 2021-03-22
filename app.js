require("dotenv").config();
const exp = require("express");
const passport = require("passport");
const session = require("express-session");
const mong = require("mongoose");
const cors = require("cors");


const app = exp();
 
const UserRoute = require("./Routes/user");
const AdminRoute = require("./Routes/adminRoute");
const CategoryRoute = require("./Routes/CategoryRoute");
const ProductRoute = require("./Routes/ProductRoute");
const CartRoute = require("./Routes/cartRoute");

const port = process.env.Port || 5000;
const moncon= process.env.Mongoose || "mongodb://localhost:27017/eCommerce";


app.use(exp.urlencoded({extended:true}))
app.use(session({secret:process.env.secret, resave:false, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(exp.json());
app.use(cors());

app.use("/api/user", UserRoute);
app.use("/api/admin", AdminRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/product", ProductRoute);
app.use("/api/cart", CartRoute);

mong.connect(moncon, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true}).then(() => {
    console.log("connected to database");
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
}).catch(err => console.log(err));

