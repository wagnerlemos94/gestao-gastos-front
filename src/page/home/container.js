import {useState, useEffect} from "react";
import { get } from "../../services/resource/index";

const useContainer = () => {

    const [journey, setJourney] = useState(null);

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
        get('lancamentos',"d7d4a54c-543c-4ba4-89d3-03b88d5ad865").then(response => {
            const lancamentos = response.data;
            setJourney(lancamentos);
            console.log(lancamentos);

        }).catch(erro => {
            alert("Deu Ruim");
            console.log(erro);
        });
        
    });


    return{
        coluns:coluns,
        rows:journey
    }
}

export default useContainer;