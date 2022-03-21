import { Button, Col, Container, Row, Form } from "react-bootstrap";
import Card from "../../../component/Card";
import Select from '../../../component/Select';
import useContainer from "./container";

const Formulario = () => {

    const { categoria, mes, tipo, functions } = useContainer();

    return(
        <Container className="mt-5">
            <Card className="text-center ml-5 mr-5" title="Cadastro">
                <Form>
                    <Row className="mt-5 mb-5 mr-5 ml-5">    
                        <Col className="col-12">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="inputGroup-sizing-default">Descrição</span>
                                <input type="text" name="descricao" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                        </Col>
                        <Col className="col-6">
                            <div class="input-group mb-3 mt-4">
                                <span class="input-group-text" id="inputGroup-sizing-default">Categoria</span>
                                <Select array={categoria}></Select>
                            </div>
                        </Col>
                        <Col className="col-6">
                            <div class="input-group mb-3 mt-4">
                                <span class="input-group-text" id="inputGroup-sizing-default">Mês</span>
                                <Select array={mes}></Select>
                            </div>
                        </Col>
                        <Col className="col-6">
                            <div class="input-group mb-3 mt-4">
                                <span class="input-group-text" id="inputGroup-sizing-default">Tipo</span>
                                <Select array={tipo}></Select>
                            </div>
                        </Col>
                        <Col className="col-6">
                            <div class="input-group mb-3 mt-4">
                                <span class="input-group-text" id="inputGroup-sizing-default">Valor</span>
                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                        </Col>
                        <Col className="text-right mt-5">
                            <Button onClick={(e) => functions.salvar(e)} type="button" className="btn-md">Salvar</Button>
                            <Button className="btn-md btn-danger" href="/principal">Cancelar</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );

}

export default Formulario;