import {useState, useEffect} from "react";
import listMeses from '../../../services/utils/listMeses';
import LancamentoResource from "../../../services/resource/lancamentoResource";
import StatusLancamentoResource from "../../../services/resource/statusLancamentoResource";
import GrupoResource from "../../../services/resource/GrupoResource";
import {formatarMoedaDoble} from "../../../services/utils/util";

import { success, error}  from  "../../../component/Toast";
import { useHistory } from 'react-router-dom';

const useContainer = () =>{

    const lancamentoService = new LancamentoResource();
    const statusLancamentoService = new StatusLancamentoResource();
    const grupoService = new GrupoResource();


    const [grupos, setcategoria] = useState([]);
    const [status, setStatus] = useState([]);
    const {meses} = listMeses();
    const dataAtual = new Date();
    const anos = [
        {
            id: (dataAtual.getFullYear() - 1),
            nome: (dataAtual.getFullYear() - 1)
        },
        {
            id: dataAtual.getFullYear(),
            nome: dataAtual.getFullYear()
        },
        {
            id: (dataAtual.getFullYear() + 1),
            nome: (dataAtual.getFullYear() + 1)
        },
    ]
    
    const history = useHistory();

    
    const inicialState  = {
        descricao:"",
        tipo:null,
        categoria:null,
        valor:null,
        data:"",
        parcela:null,
        status:null
    }

    const currencyConfig = {
        locale: "pt-BR",
        formats: {
          number: {
            BRL: {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            },
          },
        },
      };
    
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

    const arrayParcelar = () =>{
        const parcela = [];
        parcela.push({
            id:1,
            nome: `Á vista`
        })
        for(let i=2;i<=12;i++){
            parcela.push({
                id:i,
                nome: `${i} vezes`
            })
        }

        return parcela;
    }
    
    const validarFormulario = (form) => {
        let isValidate = true;

        Object.keys(form).forEach((chave) => {          
            if(chave !== "acoes" && !form[chave] && chave != "status"){
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
                data:form.data,
                categoria:form.categoria,
                status:form.status,
                parcela:form.parcela,
                mes:form.mes,
                ano:form.ano
                
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
                    setValue(inicialState);
                    history.push('/lancamentos/formulario');
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
        grupoService.listar().then(response => {
            console.log(response.data)
            setcategoria(response.data);
        }).catch(responseErro => {
            console.log(responseErro.response);
        });
        statusLancamentoService.listar().then(response => {
            console.log(response.data)
            setStatus(response.data);
        }).catch(responseErro => {
            console.log(responseErro.response);
        })
    },[]);

    return{
        currencyConfig,
        titulo:titulo,
        grupos:grupos,
        status:status,
        meses,
        anos,
        tipo:tipo,
        parcela:arrayParcelar(),
        form:value,
        functions:{
            salvar,
            setValue,
            formatarMoedaDoble
        }
    }

}

export default useContainer;