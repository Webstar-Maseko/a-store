import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";



export default function Alogin(){

    return ( <Row className="mt-5" >
        <Col md={4}></Col>
        <Col md={4}>
            <Card  className="shadow">
                <Card.Body> 
                    <Row>
                        <Col className="text-center pt-5 pb-5" md={3}>
                            <SupervisedUserCircleIcon style={{fontSize:"70"}} />
                        </Col>
                        <Col md={9}  className="text-left pt-2 pb-5">
                            <h5>Admin Login</h5>
                            
                            <Form>
                               <Form.Control type="email" className="bt-0" placeholder="Email" />
                               <Form.Control type="password" placeholder="Password" />
                               <br/>
                               <Button className="bg-success" block>Login</Button>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>

            </Card>
        </Col>
        <Col md={4}></Col>
    </Row>);
}