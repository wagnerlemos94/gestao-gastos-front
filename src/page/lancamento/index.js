import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import DataTable from "../../component/DataTable";

import useContainer from "./container";
import NavB from "./navBar";



const Lancamento = () => {
    const {
        mesSelecionado,
        valores,
        coluns,
        rows
    } = useContainer();

    const datatable = {
        columns: coluns,
        rows: rows
        ,
      };

    
    return(
        <Container className="mt-2">
            <h1 className="text-center">lançamentos de {mesSelecionado}</h1>
            <div className="text-right">
                <a href="lancamentos/formulario" className="btn btn-sm btn-primary">Cadastro</a>
            </div>

            <NavB>
                {valores ?
                    <div className="row mt-2 mb-2">
                        <div className="col-5"><span className="bg-success">Recebido no Mês: {valores.recebido}</span></div>
                        <div className="col-5"><span className="bg-warning">Gasto no Mês: {valores.gasto}</span></div>
                        <div className="col"><span className={valores.saldo >= 0 ? "bg-primary" : "bg-danger"}>Saldo no Mês: {valores.saldo}</span></div>
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