
import qs from 'qs';
import UsuarioResource from '../../services/resource/UsuarioResource';
import { useHistory } from 'react-router-dom';

const useContainer = () => {

    const service = new UsuarioResource();

    const history = useHistory();

    const login = (form) => {
        const body = qs.stringify({
            grant_type: 'password',
            username: form.login,
            password: form.senha,
        });

        service.login(body).then(response => {
            const data = response.data;
            console.log(data.access_token);
            localStorage.setItem('username', form.login);
            localStorage.setItem('token', data.access_token);
            history.push('/lancamentos');

        }).catch(erro => {
            console.log(erro.response);
            alert("Usuario ou senha invalido");
        });
    }

    return {
        functions: {
            login,
        } 
    }
}

export default useContainer;