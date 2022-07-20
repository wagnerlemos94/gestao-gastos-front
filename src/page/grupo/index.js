import React from "react";
import { Container } from "react-bootstrap";
import DataTable from "../../component/DataTable";

import useContainer from "./container";

const Grupo = () => {
    const {
        coluns,
        rows,
        titulo,
    } = useContainer();

    const datatable = {
        columns: coluns,
        rows: rows
      };

    
    return(
        <Container className="mt-2">
            <h1 className="text-center">Grupos</h1>
            <div className="text-right">
                <a href="grupos/formulario" className="btn btn-sm btn-primary">Cadastro</a>
            </div>

            <DataTable datatable={datatable} />
    </Container>
    );
}

export default Grupo;