
import qs from 'qs';

import { post } from "../../resource/index";

const useContainer = () => {

    const login = (props) => {
        if(props.login != undefined && props.senha != undefined){
            const body = qs.stringify({
                grant_type: 'password',
                username: props.login,
                senha: props.senha,
            });

            post("oauth/token", body).then(response => {
                console.log(response);
            }).catch(erro => {
                console.log(erro);

            });            

        }else{
            alert("Usuario ou senha invalido");
        }
    }

    return {
        functions: {
            login,
        } 
    }
}

export default useContainer;