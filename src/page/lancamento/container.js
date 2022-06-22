import {useState, useEffect} from "react";
import lancamentoResource from "../../services/resource/lancamentoResource";
import listMeses from '../../services/utils/listMeses';
import { MDBIcon } from "mdbreact";

import { useHistory } from 'react-router-dom';

const useContainer = () => {
  
    const service = new lancamentoResource();

    const history = useHistory();
    const [lancamento, setLancamento] = useState(null);
    const [valores, setValores] = useState(null);
    const [ urlParameters, setUrlParameters ] = useState(history.location.search);
    const [ mesSelecionado, setMesSelecionado ] = useState(null);

    const {meses} = listMeses();

    const getMesId = (id) => {
      id = id.replace(/[^\d]+/g,'');
      meses.forEach( mes => {
        if(mes.id == id){
          setMesSelecionado(mes.nome);
        }
      });
    }
    
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

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
          field: 'acoes',
          width: 200,
        }
      ]

      if(!urlParameters){
        const valorMes = today.toLocaleDateString().substring(4,5);
        setUrlParameters(`?mes=${valorMes}`);
        getMesId(valorMes);
      }

      const editar = (lancamento) => {
        lancamento.acoes = null
        console.log(lancamento)
        history.push("/lancamentos/formulario",lancamento)
      }
      
      useEffect(() => {
        const obj = {
          teste:'teste',
          outro:"outro"
        }
        service.listar(urlParameters).then(response => {
          const lancamentos = response.data;
          Object.values(lancamentos).map( lancamento => {
            if(lancamento.tipo != "SALDO"){
              lancamento.acoes =               
              <a id={lancamento.id} onClick={e => editar(lancamento)}>
                                    <MDBIcon far icon="edit" id={lancamento.id} />
                                  </a>
            }
          });
          setLancamento(lancamentos);
          getMesId(urlParameters);
        }).catch(erro => {
          console.log(erro.response);
          service.expirationToken(erro.response.data.error);
        });
        service.listarValores(urlParameters).then(response => {
          setValores(response.data);
        }).catch(erro => {
          console.log(erro.response);
        });
        
    },[urlParameters]);


    return{
        mesSelecionado:mesSelecionado,
        valores:valores,
        coluns:coluns,
        rows:lancamento,
        functions:{
          setUrlParameters          
        }
    }
}

export default useContainer;