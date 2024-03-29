import React, { useState } from "react";
import InputMask from 'react-input-mask';
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import Card from "../../../component/Card";
import Select from '../../../component/Select';
import SelectOptgroup from '../../../component/SelectOptgroup';
import useContainer from "./container";
import IntlCurrencyInput from "react-intl-currency-input"

const Formulario = () => {

    const { grupos, tipo, parcela, meses, anos, status ,functions, form, titulo, currencyConfig} = useContainer();

    return(
        <Container className="mt-5">
            <Card className="text-center ml-5 mr-5" title={titulo}>
                <Form>
                    <Row className="mt-5">    
                        <Col className="col-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text p-1" id="inputGroup-sizing-default">Descrição</span>
                                <InputMask type="text" name="descricao" id="descricao" value={form.descricao} onChange={e => functions.setValue(prevState => {return { ...prevState, descricao: e.target.value }})} 
                                className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                            </div>
                        </Col>
                        <Col className="col-6">
                            <div className="input-group mb-3">
                                <span className="input-group-text p-1" id="inputGroup-sizing-default">Categoria</span>
                                <SelectOptgroup name="categoria" onChange={e => functions.setValue(prevState => {return { ...prevState, categoria: e.target.value }})} array={grupos} selected={form.categoria ? form.categoria : form.categoria} required="true"></SelectOptgroup>
                            </div>
                        </Col>
                        <Col className="col-4">
                            <div className="input-group mb-3 mt-4">
                                <span className="input-group-text p-1" id="inputGroup-sizing-default">Data</span>
                                <InputMask type="date" name="data" id="data" value={form.data} onChange={e => functions.setValue(prevState => {return { ...prevState, data: e.target.value }})} 
                                className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                            </div>
                        </Col>
                        <Col className="col-4">
                            <div className="input-group mb-3 mt-4">
                                <span className="input-group-text p-1" id="inputGroup-sizing-default">Mês</span>
                                <Select name="mes" onChange={e => functions.setValue(prevState => {return { ...prevState, mes: e.target.value }})} 
                                array={meses} selected={form.mes ? form.mes : form.mes} required="true"></Select>
                            </div>
                        </Col>
                        <Col className="col-4">
                            <div className="input-group mb-3 mt-4">
                                <span className="input-group-text p-1" id="inputGroup-sizing-default">Ano</span>
                                <Select name="ano" onChange={e => functions.setValue(prevState => {return { ...prevState, ano: e.target.value }})} 
                                array={anos} selected={form.ano ? form.ano : form.ano} required="true"></Select>
                            </div>
                        </Col>
                        <Col className="col-4">
                            <div className="input-group mb-3 mt-4">
                                <span className="input-group-text p-1" id="inputGroup-sizing-default">Tipo</span>
                                <Select name="tipo" onChange={e => functions.setValue(prevState => {return { ...prevState, tipo: e.target.value }})} array={tipo} selected={form.tipo ? form.tipo : form.tipo} required="true"></Select>
                            </div>
                        </Col>
                        <Col className="col">
                            <div className="input-group mb-3 mt-4">
                                <span className="input-group-text p-1" id="inputGroup-sizing-default">Valor</span>
                                <IntlCurrencyInput type="text" currency="BRL" config={currencyConfig}
                                value={form.valor} onChange={e => functions.setValue(prevState => {return { ...prevState, valor:e.target.value }})} 
                                className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
                            </div>
                        </Col>
                       
                        { titulo === "Novo cadastro" ? (
                            <Col className="col">
                                <div className="input-group mb-3 mt-4">
                                    <span className="input-group-text p-1" id="inputGroup-sizing-default">Parcela</span>
                                    <Select name="parcela" onChange={e => functions.setValue(prevState => {return { ...prevState, parcela: e.target.value }})} array={parcela} selected={form.parcela ? form.parcela : form.parcela} required="true"></Select>
                                </div>
                            </Col>
                        ):(
                            <Col className="col">
                                <div className="input-group mb-3 mt-4">
                                    <span className="input-group-text p-1" id="inputGroup-sizing-default">Status</span>
                                    <Select name="status" onChange={e => functions.setValue(prevState => {return { ...prevState, status: e.target.value }})} array={status} selected={form.status ? form.status : form.status} required="true"></Select>
                                </div>
                            </Col>
                        )
                        }
                        <Col className="col-12 text-right mt-5">
                            <Button className="btn-sm pl-2 pr-2 pt-2" variant="danger" href="/lancamentos">Cancelar</Button>
                            <Button className="btn-sm pl-3 pr-3 pt-2" type="button" onClick={() => functions.salvar(form)}>Salvar</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );

}

export default Formulario;