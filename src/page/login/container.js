
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
        const body = qs.stringify({
            grant_type: 'password',
            username: form.login.replace(/[^\d]+/g,''),
            password: form.senha,
        });

        service.login(body).then(response => {
            const data = response.data;
            localStorage.setItem('username', form.login);
            localStorage.setItem('token', data.access_token);
            history.push('/lancamentos');
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