import {useState, useEffect} from "react";
import { get } from "../../services/resource/index";

import { useHistory } from 'react-router-dom';

const useContainer = () => {

    const history = useHistory();
    const [lancamento, setLancamento] = useState(null);
    const [ urlParameters, setUrlParameters ] = useState(history.location.search)

    const coluns = [
        {
          label: 'Descricao',
          field: 'descricao',
          width: 150,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
          },
        },
        {
          label: 'Categoria',
          field: 'categoria',
          width: 270,
        },
        {
          label: 'Mês',
          field: 'mes',
          width: 270,
        },
        {
          label: 'Tipo',
          field: 'tipo',
          width: 270,
        },
        {
          label: 'Valor',
          field: 'valor',
          width: 270,
        },
        {
          label: 'Ações',
          field: 'buttom',
          width: 200,
        }
      ]
      
    useEffect(() => {
        get(`lancamentos${urlParameters}`).then(response => {    
          setLancamento(response.data);
        }).catch(erro => {
            alert("Deu Ruim");
            console.log(erro);
        });
        
    },[urlParameters]);


    return{
        coluns:coluns,
        rows:lancamento,
        functions:{
          setUrlParameters
        }
    }
}

export default useContainer;