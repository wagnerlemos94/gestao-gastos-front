import React from "react";
import Card from "../../component/Card";
import { Container, Form, Button } from "react-bootstrap";

const Login = () => {
    return(
    <Card title={"Bem - Vindo"} button="Logar">
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="email" placeholder="Login" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Senha" />
                </Form.Group>
                <Button variant="primary">Logar</Button>
            </Form>
        </Container>        
    </Card>
    );
}

export default Login;