
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";


export default function Dashboard(props) {


    const {isLoggedIn} = useSelector(state => state.adminUser)

    //{ !user && props.history.push("/admin/login") }

if(!isLoggedIn)
{
  props.history.push("/admin/login")

}
    return (<Container fluid>
        <Row>
            <Col md={2}>
                Dashboard
            </Col>
            <Col md={10} >
                <h3>Content</h3>
            </Col>
        </Row>

    </Container>

    )
}