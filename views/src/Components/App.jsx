
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./Footer";

import Header from "./User/Header";
import Home from "./Home";
import GenericParentCategory from "./User/GenericParentCategory";
import Men from "./User/Categories/Mens"
import Ladies from "./User/Categories/Ladies";
import Kids from "./User/Categories/Kids";
import Baby from "./User/Categories/Baby";
import Products from "./User/Products/Products";
import Product from "./User/Products/Product";

function App() {

  return (
    <Router>
      <Header />
      <div className="App ">
        <Route
          path={"/"}
          render={({ match: { path } }) => (
            <>
              <Switch>
                <Route exact path={path} component={Home} />
                <Route exact path="/men" component={Men} />
                <Route exact path="/ladies" component={Ladies} />
                <Route exact path="/kids" component={Kids} />
                <Route exact path="/baby" component={Baby} />
                <Route path="/:root/:sub/:category" component={Products}/>
                <Route exact path="/:product" component={Product} />
                {/* <Route  path={path} component={GenericParentCategory} /> */}
           
                
                {/* {category.length > 0 ?
                  category.map((item, index) => (
                    <Route
                      path={item.name}
                      key={index}
                      component={GenericParentCategory}
                      category={item}
                    />
                  )) : <Route><h1>LOADING</h1> </Route>} */}
              </Switch>
            </>
          )}
        />

      </div>
      <Footer />
    </Router>
  );
}

export default App;
