import {useState, useEffect} from "react";
import { get } from "../../../services/resource/index";

const useContainer = () =>{

    const [journey, setJourney] = useState(null);
    const mes = [
        {
            id:1,
            nome:"Janeiro"
        },
        {
            id:2,
            nome:"Fevereiro"
        },
        {
            id:3,
            nome:"Março"
        },
        {
            id:4,
            nome:"Abril"
        },
        {
            id:5,
            nome:"Maio"
        },
        {
            id:6,
            nome:"Junho"
        },
        {
            id:7,
            nome:"Julho"
        },
        {
            id:8,
            nome:"Agosto"
        },
        {
            id:9,
            nome:"Setembro"
        },
        {
            id:10,
            nome:"Outubro"
        },
        {
            id:11,
            nome:"Novembro"
        },
        {
            id:12,
            nome:"Dezembro"
        }
    ];
    const tipo = [
        {
            id:1,
            nome:"Lançamento"
        },
        {
            id:1,
            nome:"Despesa"
        }
    ]

    const salvar = (props) => {
        // console.log(props)
        alert("teste");
    }
    
    useEffect(()=> {
        get("categorias").then(response => {
            const categoria = response.data;
            setJourney(categoria);
        }).catch(erro => {
            console.log(erro)
        })
    });

    return{
        categoria:journey,
        mes:mes,
        tipo:tipo,
        functions:{
            salvar
        }
    }

}

export default useContainer;