import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AuthContext } from "../../context/authContext";



export default function Dashboard(props) {
    let [categories, setCat] = useState([]);
    let { user, logout } = useContext(AuthContext);

    { !user && props.history.push("/admin/login") }
    useEffect(() => {
        axios.get("/api/category/index").then(res => setCat(() => res.data)).catch(err => {alert(err); props.history.push("/admin/login")})
    }, []);

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