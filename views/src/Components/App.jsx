import Aheader from "./Admin/Aheader";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Alogin from "./Admin/Authentication/Alogin";
import Aregister from "./Admin/Authentication/Aregister";
import Footer from "./Footer";
import Dashboard from "./Admin/Routes/Dashboard";


function App() {
  return (
    <Router>
      <div className="App container-fluid">
    <Route path={"/admin"} render={({ match: {path}}) => (
      <>
       <Aheader/>
      <Switch>
       <Route exact path={path + "/"} component={Dashboard} />
       <Route exact path={path + "/login"} component={Alogin} />
         <Route exact path={path + "/register"} component={Aregister} />
      </Switch>
      </>
    )} />
      </div>
         <Footer/>
    </Router>
  
  );
}

export default App;
