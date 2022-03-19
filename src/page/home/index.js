import React from "react";
import Card from "../../component/Card";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import DataTable from "../../component/DataTable";

import useContainer from "./container";



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
        <Container className="mt-5">
            <DataTable datatable={datatable} />
    </Container>
    );
}

export default Home;