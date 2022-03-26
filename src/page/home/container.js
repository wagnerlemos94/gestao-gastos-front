import {useState, useEffect} from "react";
import { get } from "../../services/resource/index";

const useContainer = () => {

    const [lancamento, setLancamento] = useState(null);

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
        get('lancamentos').then(response => {
            
            setLancamento(response.data);
        }).catch(erro => {
            alert("Deu Ruim");
            console.log(erro);
        });
        
    },[]);


    return{
        coluns:coluns,
        rows:lancamento
    }
}

export default useContainer;