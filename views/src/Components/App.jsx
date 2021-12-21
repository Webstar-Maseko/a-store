
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./Footer";

import Header from "./User/Header";
import Home from "./Home";
import GenericParentCategory from "./User/GenericParentCategory";


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
                <Route  path={path} component={GenericParentCategory} />
           
                
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
