
require("dotenv").config();
const exp = require("express");
const passport = require("passport");
const session = require("express-session");
const mong = require("mongoose");
const cors = require("cors");
const swaggerDocs = require("./Utils/Swagger");


const app = exp();
 
const UserRoute = require("./Routes/user");
const AdminRoute = require("./Routes/adminRoute");
const CategoryRoute = require("./Routes/CategoryRoute");
const ProductRoute = require("./Routes/ProductRoute");
const CartRoute = require("./Routes/cartRoute");


const port = process.env.port || 5000;
const moncon= process.env.Mongo || "mongodb://localhost:27017/eCommerce";


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
mong.connect(moncon, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true}).then(() => {
    console.log("connected to database");
   
}).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});