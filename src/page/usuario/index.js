import React from "react";
import { Container } from "react-bootstrap";
import DataTable from "../../component/DataTable";

import useContainer from "./container";

const Usuario = () => {
    const {
        coluns,
        rows
    } = useContainer();

    const datatable = {
        columns: coluns,
        rows: rows
      };

    
    return(
        <Container className="mt-2">
            <h1 className="text-center">Usuário</h1>
    </Container>
    );
}

export default Usuario;