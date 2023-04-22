import { Button, Col, Container, Row, Form } from "react-bootstrap";

import Card from "../../../component/Card";
import useContainer from "./container";
import InputMask from 'react-input-mask';

const Formulario = () => {

    const { functions, titulo, form, cadastrese } = useContainer();

    return(
        <Container className="mt-5">
            <Card className="text-center ml-5 mr-5" title={titulo}>
                <Form>
                    <Row className="mt-5">   
                        <Col className={`col-sm-${cadastrese ? '12':'6'}`}>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Nome</span>
                                <input type="text" name="nome" id="nome" value={form.nome}
                                onChange={e => functions.setValue(prevState => {return { ...prevState, nome: e.target.value }})} 
                                className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                            </div>
                        </Col>
                        <Col className="col-sm-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">CPF</span>
                                <InputMask type="text" mask="999.999.999-99" name="login" id="login" value={form.login}
                                onChange={e => functions.setValue(prevState => {return { ...prevState, login: e.target.value }})} 
                                className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                            </div>
                        </Col>
                        {!cadastrese?
                        <Col className="col-sm-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Senha</span>
                                <input type="password" name="senha" id="senha" value={form.senha}
                                onChange={e => functions.setValue(prevState => {return { ...prevState, senha: e.target.value }})} 
                                className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                            </div>
                        </Col> :(<></>)
                        }
                        <Col className="col-sm-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                                <input type="email" name="email" id="email" value={form.email}
                                onChange={e => functions.setValue(prevState => {return { ...prevState, email: e.target.value }})} 
                                className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                            </div>
                        </Col>
                        <Col className="text-left">
                            <Button className="btn-sm float-right" type="button" onClick={e => functions.salvar(form)}>Salvar</Button>
                            <Button className="btn-sm pl-2 pr-2 float-right" variant="danger" href="/dashboard">Cancelar</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );

}

export default Formulario;

