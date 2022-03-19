import { Button, Col, Collapse, Container, Row } from "react-bootstrap";
import Card from "../../../component/Card";

const formulario = () => {
    return(
        <Container className="mt-5">
            <Card className="text-center ml-5 mr-5" title="Cadastro">
                <Row className="mt-5 mb-5 mr-5 ml-5">    
                    <Col className="col-12">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-default">Descrição</span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </Col>
                    <Col className="col-6">
                        <div class="input-group mb-3 mt-4">
                            <span class="input-group-text" id="inputGroup-sizing-default">Categoria</span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </Col>
                    <Col className="col-6">
                        <div class="input-group mb-3 mt-4">
                            <span class="input-group-text" id="inputGroup-sizing-default">Mês</span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </Col>
                    <Col className="col-6">
                        <div class="input-group mb-3 mt-4">
                            <span class="input-group-text" id="inputGroup-sizing-default">Tipo</span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </Col>
                    <Col className="col-6">
                        <div class="input-group mb-3 mt-4">
                            <span class="input-group-text" id="inputGroup-sizing-default">Valor</span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </Col>
                    <Col className="text-right mt-5">
                        <Button className="btn-md">Salvar</Button>
                        <Button className="btn-md btn-danger">Cancelar</Button>
                    </Col>
                </Row>
            </Card>
        </Container>
    );

}

export default formulario;