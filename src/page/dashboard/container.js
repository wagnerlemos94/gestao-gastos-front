import {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import listMeses from '../../services/utils/listMeses';
import lancamentoResource from "../../services/resource/lancamentoResource";
import {formatarMoeda,formatarMoedaDoble} from "../../services/utils/util";


const useContainer = () => {
    const lancamnetoResource = new lancamentoResource();
    const history = useHistory();
    const [ urlParameters, setUrlParameters ] = useState(history.location.search);
    const valoresInicial = {
        gasto:0,
        recebido:0,
        saldo:0
      }
    const [valores, setValores] = useState(valoresInicial);
    const {meses} = listMeses();
    const [ mesSelecionado, setMesSelecionado ] = useState(null);

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
    if(!urlParameters){
        const valorMes = today.toLocaleDateString().substring(4,5);
        setUrlParameters(`?mes=${valorMes}`);
        getMesId(valorMes);
      }
      
      
    useEffect(() => {
    lancamnetoResource.listarValores(urlParameters).then(response => {
        setValores(response.data);
        }).catch(erro => {
        console.log(erro.response);
        });
    },[]);

    return{
        mesSelecionado:mesSelecionado,
        valores:valores,
        functions:{
            formatarMoeda    
          }
    }
}

export default useContainer;