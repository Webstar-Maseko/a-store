
require("dotenv").config();
const exp = require("express");
const passport = require("passport");
const session = require("express-session");
const mong = require("mongoose");
const cors = require("cors");
const swaggerDocs = require("./Utils/Swagger");


const app = exp();
 
const UserRoute = require("./Routes/userRoute");
const AdminRoute = require("./Routes/adminRoute");
const CategoryRoute = require("./Routes/CategoryRoute");
const ProductRoute = require("./Routes/ProductRoute");
const CartRoute = require("./Routes/cartRoute");


const port = process.env.port || 5000;
const moncon= process.env.NODE_ENV ==="test"? "mongodb://127.0.0.1:27017/eCommerceTest" : process.env.Mongo || "mongodb://l127.0.0.1:27017/eCommerce";

mong.connect(moncon, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true});

app.use(exp.urlencoded({extended:true}))
app.use(session({secret:process.env.secret, resave:false, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(exp.json());
app.use(cors({
    origin:"*"
}));

app.use("/api", UserRoute);
app.use("/api", AdminRoute);
app.use("/api", CategoryRoute);
app.use("/api", ProductRoute);
app.use("/api", CartRoute);

swaggerDocs(app);

const db = mong.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open",() => {
  console.log("Database Connected successfully");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});


module.exports = app;