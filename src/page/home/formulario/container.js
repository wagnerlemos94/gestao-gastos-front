import React, {useState, useEffect} from "react";
import { lancamento, get } from "../../../services/resource/index";
import listMeses from '../../../services/utils/listMeses';

import { useHistory } from 'react-router-dom';

const useContainer = () =>{

    const [categorias, setcategoria] = useState(null);
    const {meses} = listMeses();
    
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
        meses,
        tipo:tipo,
        functions:{
            salvar
        }
    }

}

export default useContainer;