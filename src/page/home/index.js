import React from "react";
import Card from "../../component/Card";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

// import useContainer from "./container";



const Home = () => {
    // const {
    //     functions
    // } = useContainer();

    
    return(
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="auto" className="mt-5">
                    <Card title={"Bem - Vindo"} button="Logar" className="bg-secondary mt-5">
                        Home  
                    </Card>
                </Col>
            </Row>    
    </Container>
    );
}

export default Home;