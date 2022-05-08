import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { IconContext } from "react-icons";
import {BsFacebook} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";
import { IconButton } from "@material-ui/core";

const Auth = (props)=>{
    return (
    <Modal
      {...props}

      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
      <div className="auth">
        <h1 className="text-center mod">We're so happy
        <br/> 
            to see you!
        </h1>

        <p className="pt-4 pb-4 text-center modPar">Awesome new faves this way.
        <br/>
        Let's go shopping...
        </p>

      </div>
      
      <div className="d-grid gap-4 sect">
            <Button variant="danger" block className="pl-5 pr-5 pt-3 pb-3">SIGN IN</Button>
            <Button variant="outline-secondary" block className="pl-5 pr-5 pt-3 pb-3 text-dark" >REGISTER</Button>
        </div>

        <div className="pt-1">
        <div className="strike text-center">
            <span className="oAuth pl-3 pr-3">WITH</span>

         </div>


         <div className="pt-2 text-center">
            <IconContext.Provider value={{ size: "1.5em", color:"#3b5998" }}>
            <IconButton>
            <BsFacebook/>
            </IconButton>
           
            </IconContext.Provider>

            <IconContext.Provider value={{ size: "1.5em" }}>
            <IconButton>
            <FcGoogle/>
            </IconButton>
     
            </IconContext.Provider>
         </div>

        </div>
        
   

        
      </Modal.Body>

    </Modal>);
}

export default Auth;