import { Button, Col, Container, Row, Form } from "react-bootstrap";

import Card from "../../../component/Card";
import useContainer from "./container";

const Formulario = () => {

    const { functions, titulo, form } = useContainer();

    return(
        <Container className="mt-5">
            <Card className="text-center ml-5 mr-5" title={titulo}>
                <Form>
                    <Row className="mt-5">    
                        <Col className="col-9">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Descrição</span>
                                <input type="text" name="descricao" id="descricao" value={form.nome} onChange={e => functions.setValue(prevState => {return { ...prevState, nome: e.target.value }})} 
                                className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                            </div>
                        </Col>
                        <Col className="text-left">
                            <Button type="button" onClick={e => functions.salvar(form)} className="btn-sm">Salvar</Button>
                            <Button className="btn-sm" variant="danger" href="/categorias">Cancelar</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );

}

export default Formulario;

