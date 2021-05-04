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
import SubCategory from "./Admin/Routes/SubCategory";

function App() {
  return (
    <Router>
      <div className="App ">
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
                      path={path + "/category"}
                      component={Category}
                    />
                    <Route exact path={path + "/sub-category"} component={SubCategory} />
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
