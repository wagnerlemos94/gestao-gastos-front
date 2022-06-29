import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import DataTable from "../../component/DataTable";

import useContainer from "./container";
import NavB from "./navBar";



const Lancamento = () => {
    const {
        mesSelecionado,
        valores,
        functions,
        datatable
    } = useContainer();
    
    return(
        <Container className="mt-2">
            <h1 className="text-center">lançamentos de {mesSelecionado}</h1>
            <div className="text-right">
                <a href="lancamentos/formulario" className="btn btn-sm btn-primary">Cadastro</a>
            </div>

            <NavB>
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
            </NavB>
    </Container>
    );
}

export default Lancamento;