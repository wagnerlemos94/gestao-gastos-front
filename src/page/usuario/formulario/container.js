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
        senha:""
    };
    usuario.senha = undefined;
    
    const [value, setValue] = useState(usuario); 
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
                login:form.login,
                senha:form.senha
            }        
            
            usuarioResource.atualizar(value.id, body).then( response => {
                history.push('/categorias');
                Deslogar();
                success("Registro Editado com sucesso!");
            }).catch( responseErro => {
                const erros =  responseErro.response.data.errors;
                if(erros){
                    Object.values(erros).map(erro => {
                        error(erro.defaultMessage);
                    });
                }
            });
        }
    }

    
    useEffect(()=> {
        if(history.location.state){
            setValue(JSON.parse(localStorage.getItem("usuarioLogado")));
            setTitulo("Editar cadastro");
        }else{
            setTitulo("Novo cadastro");
        }
    },[]);

    return{
        titulo:titulo,
        form:value,
        functions:{
            salvar,
            setValue
        }
    }

}

export default useContainer;