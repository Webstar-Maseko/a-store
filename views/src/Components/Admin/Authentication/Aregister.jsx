import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button } from '@material-ui/core';


export default function Aregister(){

    return ( <Row className="mt-5" >
        <Col md={4}></Col>
        <Col md={4}>
            <Card  className="shadow">
                <Card.Body className="text-center"> 
        
                            <SupervisedUserCircleIcon style={{fontSize:"70"}} />
                            <h5>Admin Register</h5>
                            <br/>
                            
                            <Form>
                               <Form.Control type="email" className="pt-2" placeholder="Email" />
                               <Form.Control type="text" className="pt-2" placeholder="First Name" />
                               <Form.Control type="text" className="pt-2" placeholder="Last Name" />
                               <Form.Control  className="pt-2" placeholder="Phone number" />
                               <Form.Control type="password" className="pt-3 pb-3" placeholder="Password" />
                               <Form.Control type="password" className="pt-3 pb-3" placeholder="Confirm Password" />
                               <br/>
                               <Button>Register</Button>
                            </Form>
                    
                </Card.Body>

            </Card>
        </Col>
        <Col md={4}></Col>
    </Row>);
}
