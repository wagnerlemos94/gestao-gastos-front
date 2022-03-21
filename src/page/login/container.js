
import qs from 'qs';

import { useState, useContext } from 'react';

import StoreContext from '../../services/store/Context';

import { post } from "../../services/resource/index";
import { useHistory } from 'react-router-dom';

const useContainer = () => {

    const history = useHistory();
    const { setToken, setMessage } = useContext(StoreContext);


    const login = (props) => {
        const body = qs.stringify({
            grant_type: 'password',
            username: props.login,
            password: props.senha,
        });

        post("oauth/token", body).then(response => {
            const data = response.data;
            console.log(data.access_token);
            localStorage.setItem('username', props.login);
            localStorage.setItem('token', data.access_token);
            setToken(data.access_token);
            history.push('/principal');

        }).catch(erro => {
            console.log(erro);
            alert("Usuario ou senha invalido");
            setMessage({
                title: 'Opa!',
                type: 'error',
                message: 'Sua senha está incorreta'
            });
        });
    }

    return {
        functions: {
            login,
        } 
    }
}

export default useContainer;