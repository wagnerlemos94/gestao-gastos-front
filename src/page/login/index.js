import React from "react";
import Card from "../../component/Card";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import InputMask from 'react-input-mask';
import background from "../../img/login.jpeg";

import useContainer from "./container";



const Login = () => {
    const {
        functions,
        form
    } = useContainer();
    
    return(
        <div className="" style={{ 
            backgroundImage: `url(${background})`,
            height:"640px"
          }}>
            <Row className="justify-content-md-end mr-4">
                <Col md="auto" className="mt-5">
                    <Card title={"Bem - Vindo"} button="Logar" className="bg-info mt-5 p-4">
                        <Form className="mt-4">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Login</Form.Label>
                                {/* <Form.Control type="email" onChange={e => form.login = e.target.value} placeholder="Login" name="email"  required/> */}
                                <InputMask type="text" mask="999.999.999-99" placeholder="000.000.000-00" value={form.login} onChange={e => functions.setValue(prevState => {return { ...prevState, login: e.target.value }})} 
                                name="login" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                            </Form.Group>

                            <Form.Group className="mb-5 mt-5" controlId="formBasicPassword">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control type="password" placeholder="Senha" name="senha" value={form.senha}
                                onChange={e => functions.setValue(prevState => {return { ...prevState, senha: e.target.value }})}  required/>
                            </Form.Group>
                            <Button type="button" onClick={(e) => functions.login(form)} variant="primary" className="col-12">Logar</Button>
                        </Form>    
                    </Card>
                </Col>
            </Row>    
        </div>
    );
}

export default Login;