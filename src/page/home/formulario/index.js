import React from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import Card from "../../../component/Card";
import Select from '../../../component/Select';
import useContainer from "./container";

const Formulario = () => {

    const { categoria, mes, tipo, functions } = useContainer();

    const form = {
        descricao:undefined,
        tipo:undefined,
        categoria:undefined,
        valor:undefined
    }

    return(
        <Container className="mt-5">
            <Card className="text-center ml-5 mr-5" title="Cadastro">
                <Form>
                    <Row className="mt-5 mb-5 mr-5 ml-5">    
                        <Col className="col-12">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Descrição</span>
                                <input type="text" onChange={e => form.descricao = e.target.value} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                        </Col>
                        <Col className="col-6">
                            <div className="input-group mb-3 mt-4">
                                <span className="input-group-text" id="inputGroup-sizing-default">Categoria</span>
                                <Select name="categoria" onChange={e => form.categoria = e.target.value} array={categoria}></Select>
                            </div>
                        </Col>
                        <Col className="col-6">
                            <div className="input-group mb-3 mt-4">
                                <span className="input-group-text" id="inputGroup-sizing-default">Mês</span>
                                <Select name="mes" onChange={e => form.mes = e.target.value} array={mes}></Select>
                            </div>
                        </Col>
                        <Col className="col-6">
                            <div className="input-group mb-3 mt-4">
                                <span className="input-group-text" id="inputGroup-sizing-default">Tipo</span>
                                <Select name="tipo" onChange={e => form.tipo = e.target.value} array={tipo}></Select>
                            </div>
                        </Col>
                        <Col className="col-6">
                            <div className="input-group mb-3 mt-4">
                                <span className="input-group-text" id="inputGroup-sizing-default">Valor</span>
                                <input type="text" onChange={e => form.valor = e.target.value} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                            <p>{form.descricao}</p>
                        </Col>
                        <Col className="text-right mt-5">
                            <Button type="button" onClick={() => functions.salvar(form)} className="btn-md">Salvar</Button>
                            <Button className="btn-md" variant="danger" href="/principal">Cancelar</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );

}

export default Formulario;