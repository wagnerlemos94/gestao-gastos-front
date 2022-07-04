import React from "react";
import CardMin from "../../component/CardMin";
import Grafico from "../../component/Grafico";
import useContainer from "./container";

const Dashboard = () => {

    const {valores, mesSelecionado, functions} = useContainer();
    return(
        <div className="container ml-5 row">
            <h1 className="text-center mt-4">Lançamentos de {mesSelecionado}</h1>
            <CardMin className="ml-5 mr-5" icon="fas fa-file-invoice-dollar fa-2x"
                         valor={functions.formatarMoeda(valores.recebido)} textColor="text-success" titulo="Receita"
            />
            <CardMin className="ml-5 mr-5" icon="fas fa-file-invoice-dollar fa-2x"
                         valor={functions.formatarMoeda(valores.gasto)} textColor="text-warning" titulo="Despesa"
            />
            <CardMin className="ml-5" icon="fas fa-file-invoice-dollar fa-2x"
                         valor={functions.formatarMoeda(valores.saldo)} textColor={valores.saldo > 0 ? "text-primary" : "text-danger"} titulo="Saldo"
            />
            <Grafico></Grafico>
        </div>
    )
}

export default Dashboard;