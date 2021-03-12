import Aheader from "./Admin/Aheader";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Alogin from "./Admin/Authentication/Alogin";
import Aregister from "./Admin/Authentication/Aregister";
import Footer from "./Footer";


function App() {
  return (
    <Router>
         <Aheader/>
         <div className="App container-fluid">
         <Route path="/admin/login" component={Alogin} />
         <Route path="/admin/register" component={Aregister} />
    
         </div>
         <Footer/>
    </Router>
  
  );
}

export default App;
