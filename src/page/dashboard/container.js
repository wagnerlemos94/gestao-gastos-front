import {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import lancamentoResource from "../../services/resource/lancamentoResource";
import {formatarMoeda,formatarMoedaDoble} from "../../services/utils/util";
import { getMesNome } from '../../services/utils/listMeses';


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
    const [ mesSelecionado, setMesSelecionado ] = useState(null);

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    if(!urlParameters){
        const valorMes = today.getMonth() + 1;
        setUrlParameters(`?mes=${valorMes}`);
        setMesSelecionado(getMesNome(valorMes));
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