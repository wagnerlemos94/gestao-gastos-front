
import qs from 'qs';
import UsuarioResource from '../../services/resource/UsuarioResource';
import { useHistory } from 'react-router-dom';
import {useState, useEffect} from "react";

import { error } from '../../component/Toast';

const useContainer = () => {

    const service = new UsuarioResource();

    const history = useHistory();

    const inicialState = {
        login:"",
        senha:""
    }

    const [value, setValue] = useState(inicialState); 

    const login = (form) => {
        const username = form.login.replace(/[^\d]+/g,'');
        const body = qs.stringify({
            grant_type: 'password',
            username: username,
            password: form.senha,
        });

        service.login(body).then(response => {
            const data = response.data;
            service.buscarPorLogin(`${username}`).then( response => {
                const usuarioLogado = {
                    nome: response.data.nome,
                    login:response.data.login
                }
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            }).catch( err => {
                console.log(err.response);
            });
            localStorage.setItem('token', data.access_token);
            history.push('/dashboard');
        }).catch(erro => {
            error("Usuario ou senha inválido");
        });
    }

    useEffect(()=> {
        setValue(inicialState);
    },[]);

    return {
        form:value,
        functions: {
            login,
            setValue
        } 
    }
}

export default useContainer;