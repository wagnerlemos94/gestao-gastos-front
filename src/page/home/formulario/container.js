import React, {useState, useEffect} from "react";
import { lancamento, get } from "../../../services/resource/index";

import { useHistory } from 'react-router-dom';

const useContainer = () =>{

    const [categorias, setcategoria] = useState(null);
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
            nome:"Receita"
        },
        {
            id:2,
            nome:"Despesa"
        }
    ]

    const history = useHistory();

    const salvar = (form) => {
        // e.preventDefault();
        const body = {
            descricao:form.descricao,
            tipo:form.tipo,
            valor:form.valor,
            mes:form.mes,
            categoria:{id:form.categoria},
            usuario:{id:1},
        }

        lancamento("lancamentos", body).then(response => {
            console.log(response.data);
            history.push('/principal');
        }).cacth(erro => {
            console.log(erro);
        });
    }

    
    useEffect(()=> {
        get("categorias").then(response => {
            setcategoria(response.data);
        }).catch(erro => {
            console.log(erro)
        })
    },[]);

    return{
        categoria:categorias,
        mes:mes,
        tipo:tipo,
        functions:{
            salvar
        }
    }

}

export default useContainer;