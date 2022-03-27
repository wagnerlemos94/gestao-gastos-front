import React from "react";
import Card from "../../component/Card";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import DataTable from "../../component/DataTable";

import useContainer from "./container";
import NavB from "./navBar";



const Home = () => {
    const {
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
            <h1 className="text-center">lançamentos</h1>
            <div className="text-right">
                <a href="lancamentos/formulario" className="btn btn-sm btn-primary">Cadastro</a>
            </div>

            <NavB>
            <DataTable datatable={datatable} />
            </NavB>
    </Container>
    );
}

export default Home;