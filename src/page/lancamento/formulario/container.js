import {useState, useEffect} from "react";
import listMeses from '../../../services/utils/listMeses';
import LancamentoResource from "../../../services/resource/lancamentoResource";
import CategoriaResource from "../../../services/resource/categoriaResource";
import {formatarMoedaDoble} from "../../../services/utils/util";

import { success, error}  from  "../../../component/Toast";
import { useHistory } from 'react-router-dom';

const useContainer = () =>{

    const lancamentoService = new LancamentoResource();
    const categoriaService = new CategoriaResource();


    const [categorias, setcategoria] = useState([]);
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
                descricao:form.descricao,
                tipo:form.tipo,
                valor:formatarMoedaDoble(form.valor),
                mes:form.mes,
                categoria:form.categoria
            }      
            if(history.location.state){
                const id = history.location.state.id;
                body.id = id
                lancamentoService.atualizar(id, body).then( response => {
                    history.push('/lancamentos');
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
                lancamentoService.salvar(body).then( response => {
                    success("Registro Cadastrado com sucesso!");
                    history.push('/lancamentos');
                }).catch( responseErro => {
                    const erros =  responseErro.response.data.errors;
                    Object.values(erros).map(erro => {
                        error(erro.defaultMessage);
                    });
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
        categoriaService.listar().then(response => {
            setcategoria(response.data);
        }).catch(responseErro => {
            console.log(responseErro.response);
        })
    },[]);

    return{
        titulo:titulo,
        categorias:categorias,
        meses,
        tipo:tipo,
        form:value,
        functions:{
            salvar,
            setValue,
            formatarMoedaDoble
        }
    }

}

export default useContainer;