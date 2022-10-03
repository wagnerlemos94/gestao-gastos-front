import React from "react";
import { Container } from "react-bootstrap";
import DataTable from "../../component/DataTable";

import useContainer from "./container";

const Usuario = () => {
    const {
        datatable
    } = useContainer();

    
    return(
        <Container className="mt-2">
            <div className="text-right">
                <a href="usuarios/formulario" className="btn btn-sm btn-primary">Cadastro</a>
            </div>
            <h1 className="text-center">Usuário</h1>
            <DataTable datatable={datatable} />
    </Container>
    );
}

export default Usuario;