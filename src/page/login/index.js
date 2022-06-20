import React from "react";
import Card from "../../component/Card";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import useContainer from "./container";



const Login = () => {
    const {
        functions
    } = useContainer();

    const form = {
        login:undefined,
        senha:undefined
    }
    
    return(
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="auto" className="mt-5">
                    <Card title={"Bem - Vindo"} button="Logar" className="bg-info mt-5">
                        <Form className="mt-4">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="email" onChange={e => form.login = e.target.value} placeholder="Login" name="email"  required/>
                            </Form.Group>

                            <Form.Group className="mb-5 mt-5" controlId="formBasicPassword">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control type="password" onChange={e => form.senha = e.target.value} placeholder="Senha" name="senha" required/>
                            </Form.Group>
                            <Button type="button" onClick={(e) => functions.login(form)} variant="primary" className="col-12">Logar</Button>
                        </Form>    
                    </Card>
                </Col>
            </Row>    
        </Container>
    );
}

export default Login;