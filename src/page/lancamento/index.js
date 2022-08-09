import React from "react";
import { Container, Form, Button, Row, Col, Dropdown } from "react-bootstrap";
import DataTable from "../../component/DataTable";
import InputMask from 'react-input-mask';

import useContainer from "./container";
import NavB from "./navBar";
import { MDBIcon } from "mdbreact";



const Lancamento = () => {
    const {
        valores,
        functions,
        datatable
    } = useContainer();
    
    return(
        <Container className="mt-2">    
            <h1 className="text-center">Lançamentos</h1>
            <div className="row">          
            
            <div className="text-right">
                <a href="lancamentos/formulario" className="btn btn-sm btn-primary">Cadastro</a>
            </div>
            </div>
            <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filtro
      </Dropdown.Toggle>
      <Dropdown.Menu>
          <div className="row">
              <div className="col-5 ml-2">
                <span className="" id="inputGroup-sizing-default">Inicio:</span>
                <InputMask type="date" name="data" id="data" className="form-control" 
                onChange={e => functions.setFiltroData(prevState => {return { ...prevState, dataInicio: e.target.value }})} 
                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
              </div>
            <div className="col-5 mr-1">
                <span className="" id="inputGroup-sizing-default">Final:</span>
                <InputMask type="date" name="data" id="data" className="form-control"
                onChange={e => functions.setFiltroData(prevState => {return { ...prevState, dataFinal: e.target.value }})} 
                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
            </div>
            <div className="col mt-3">
                <a onClick={e => functions.filtro()}>
                    <MDBIcon icon="search" className="mt-3"/>
                </a>
            </div>
          </div>
      </Dropdown.Menu>
    </Dropdown>

            {valores ?
                <div className="row mt-2 mb-2">
                    <div className="col-4 ml-5 mr-2"><label className="bg-success p-1">Recebido no Mês: {functions.formatarMoeda(valores.recebido)}</label></div>
                    <div className="col-4"><label className="bg-warning p-1">Gasto no Mês: {functions.formatarMoeda(valores.gasto)}</label></div>
                    <div className="col"><label className={valores.saldo >= 0 ? "bg-primary p-1" : "bg-danger p-1"}>Saldo no Mês: {functions.formatarMoeda(valores.saldo)}</label></div>
                </div>
                :
                <div></div>
            }
            <DataTable datatable={datatable} />
    </Container>
    );
}

export default Lancamento;