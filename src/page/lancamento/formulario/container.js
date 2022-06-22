import {useState, useEffect} from "react";
import { lancamento, get } from "../../../services/resource/index";
import listMeses from '../../../services/utils/listMeses';
import LancamentoResource from "../../../services/resource/lancamentoResource";

import { useHistory } from 'react-router-dom';

const useContainer = () =>{

    const service = new LancamentoResource();


    const [categorias, setcategoria] = useState(null);
    const {meses} = listMeses();
    
    const history = useHistory();

    
    const inicialState  = {
        descricao:undefined,
        tipo:undefined,
        categoria:undefined,
        valor:undefined,
        mes:undefined
    }
    
    const [value, setValue] = useState(inicialState); 
    const [titulo, setTitulo] = useState(null); 
    
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

    const salvar = (form) => {
        const body = {
            descricao:form.descricao,
            tipo:form.tipo,
            valor:form.valor,
            mes:form.mes,
            categoria:{id:form.categoria},
            usuario:{id:1},
        }

        if(history.location.state){
            const id = history.location.state.id;
            body.id = id
            service.atualizar(id, body).then( response => {
                history.push('/lancamentos');
            }).catch( error => {
                console.log(error.response);
            });
        }else{
            service.salvar(body).then( response => {
                history.push('/lancamentos');
            }).catch( error => {
                console.log(error.response);
            });
        }
    }

    
    useEffect(()=> {
        if(history.location.state){
            setValue(history.location.state);
            setTitulo("Editar cadastro");
        }else{
            setTitulo("Novo cadastro");
        }
        get("categorias").then(response => {
            setcategoria(response.data);
        }).catch(erro => {
            console.log(erro.response)
        })
    },[]);

    return{
        titulo:titulo,
        categoria:categorias,
        meses,
        tipo:tipo,
        form:value,
        functions:{
            salvar,
            setValue
        }
    }

}

export default useContainer;