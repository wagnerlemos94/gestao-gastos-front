import {useState, useEffect} from "react";
import { success, error}  from  "../../../component/Toast";
import { useHistory } from 'react-router-dom';
import UsuarioResource from "../../../services/resource/UsuarioResource";
import {Deslogar} from '../../../services/utils/util';

const useContainer = () =>{

    const usuarioResource = new UsuarioResource();
    const history = useHistory();
    // const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const usuario = {
        nome:"",
        login:"",
        senha:"",
        status:"",
        email:""
    };
    
    const [value, setValue] = useState(usuario); 
    const [titulo, setTitulo] = useState(null); 
    const [cadastrese, setCadastrese] = useState(false); 

    const validarFormulario = (form) => {

        let isValidate = true;

        Object.keys(form).forEach((chave) => {          
            if(chave !== "acoes" && chave !== "root" && chave !== "status" && !form[chave]){
                error(`Campo ${chave} Obrigatório!`);
                isValidate = false;
                return isValidate;
            }
        });

        return isValidate;
    }

    const salvar = (form) => {
        if(cadastrese){
            form.senha = form.login
        }
        if(validarFormulario(form)){
            let body = {
                nome:form.nome,
                login:form.login,
                senha:form.senha,
                email:form.email
            }        

            console.log(body);
            
            usuarioResource.cadastrarUsuarioCadastro(body).then( response => {
                history.push('/');
                success("Registro Cadastrado com sucesso!");
            }).catch( responseErro => {
                const erros =  responseErro.response.data.errors;
                if(erros){
                    Object.values(erros).map(erro => {
                        error(erro.defaultMessage);
                    });
                }else{
                    error("Erro ao Cadastrar!")
                }
            });
        }
    }

    
    useEffect(()=> {
        console.log(history.location.state);
        if(history.location.state?.cadastrese){
            setCadastrese(history.location.state.cadastrese);
            setTitulo("Novo cadastro");
            return false;
        }

        if(history.location.state){
            // setValue(JSON.parse(localStorage.getItem("usuarioLogado")));
            setValue(history.location.state);
            setTitulo("Editar cadastro");
            return false;
        }else{
            setTitulo("Novo cadastro");
        }
    },[]);

    return{
        titulo:titulo,
        form:value,
        cadastrese:cadastrese,
        functions:{
            salvar,
            setValue
        }
    }

}

export default useContainer;