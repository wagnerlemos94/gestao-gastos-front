import {useState, useEffect} from "react";
import { lancamento, get } from "../../../services/resource/index";
import listMeses from '../../../services/utils/listMeses';

import { success, error}  from  "../../../component/Toast";
import { useHistory } from 'react-router-dom';
import CategoriaResource from "../../../services/resource/categoriaResource";
import GrupoResource from "../../../services/resource/GrupoResource";

const useContainer = () =>{

    const categoriaResource = new CategoriaResource();
    const grupoResource = new GrupoResource();

    const [grupos, setGrupo] = useState(null);
    const history = useHistory();

    
    const inicialState  = {
        nome:undefined,
        grupo:undefined
    }
    
    const [value, setValue] = useState(inicialState); 
    const [titulo, setTitulo] = useState(null); 

    const validarFormulario = (form) => {

        let isValidate = true;

        Object.keys(form).forEach((chave) => {     
            if(chave !== "acoes" && !form[chave]){
                error(`Campo ${chave} Obrigatório!`);
                isValidate = false;
                return isValidate;
            }
        });

        return isValidate;
    }

    const salvar = (form) => {
        if(validarFormulario(form)){
            let body = {
                nome:form.nome,
                grupo:form.grupo
            }        
        
            if(history.location.state){
                const id = history.location.state.id;
                body.id = id
                categoriaResource.atualizar(id, body).then( response => {
                    history.push('/categorias');
                    success("Registro Editado com sucesso!");
                }).catch( responseErro => {
                    const erros =  responseErro.response.data.errors;
                    if(erros){
                        Object.values(erros).map(erro => {
                            error(erro.defaultMessage);
                        });
                    }
                });
            }else{
                categoriaResource.salvar(body).then( response => {
                    success("Registro Cadastrado com sucesso!");
                    history.push('/categorias');
                }).catch( responseErro => {
                    const erros =  responseErro.response.data;
                    console.log(erros);
                    error(erros.mensagemUsuario);
                });
            }
        }
    }

    
    useEffect(()=> {
        if(history.location.state){
            setValue(history.location.state);
            setTitulo("Editar cadastro");
        }else{
            setTitulo("Novo cadastro");
        }
        grupoResource.listar()
        .then(response => {
            setGrupo(response.data);
        }).catch(erro => {
            console.log(erro.response)
        })
    },[]);

    return{
        titulo:titulo,
        grupos:grupos,
        form:value,
        functions:{
            salvar,
            setValue
        }
    }

}

export default useContainer;