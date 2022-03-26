import { categoria } from "../../services/resource/index";

import { useHistory } from 'react-router-dom';

const useContainer = () => {

    const history = useHistory();

    const salvar = (form) => {
        const body = { 
            nome:form.descricao
        }
        categoria("categorias", body).then(response => {
            console.log(response.data);
            history.push('/principal');
        }).cacth(erro => {
            console.log(erro);
        });
    }

    return{
        functions:{
            salvar
        }
    }

}

export default useContainer;