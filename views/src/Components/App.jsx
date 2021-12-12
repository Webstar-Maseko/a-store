import Aheader from "./Admin/Aheader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alogin from "./Admin/Authentication/Alogin";
import Aregister from "./Admin/Authentication/Aregister";
import Footer from "./Footer";
import Dashboard from "./Admin/Routes/Dashboard";
import Category from "./Admin/Routes/Category";
import SideNav from "./Admin/SideNav";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Product from "./Admin/Routes/Product";
import Header from "./User/Header";
import Home from "./Home";
import GenericParentCategory from "./User/GenericParentCategory";
import { useState, useEffect } from "react";
import axios from "axios";

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
        <Route
          path={"/admin"}
          render={({ match: { path } }) => (
            <>
              <Aheader />
              <Row>
                <Col md={2}>
                  <SideNav />
                </Col>
                <Col md={10}>
                  <Switch>
                    <div className="container-fluid">
                      <Route exact path={path + "/"} component={Dashboard} />
                      <Route exact path={path + "/login"} component={Alogin} />
                      <Route
                        exact
                        path={path + "/register"}
                        component={Aregister}
                      />
                      <Route
                        exact
                        path={path + "/products"}
                        component={Product}
                      />
                      <Route
                        exact
                        path={path + "/category"}
                        component={Category}
                      />
                    </div>
                  </Switch>
                </Col>
              </Row>
            </>
          )}
        />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
