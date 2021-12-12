import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dashboard from "./Admin/Routes/Dashboard";
import Category from "./Admin/Routes/Category";
import SideNav from "./Admin/SideNav";
import Product from "./Admin/Routes/Product";
import Aheader from "./Admin/Aheader";
import Alogin from "./Admin/Authentication/Alogin";
import Aregister from "./Admin/Authentication/Aregister";

function App() {
  return (
 <Router>
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
                    <div className="container-fluid mt-5 pt-5">
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
 </Router>
  );
}

export default App;
