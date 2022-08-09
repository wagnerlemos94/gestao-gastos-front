import {useState, useEffect} from "react";
import lancamentoResource from "../../services/resource/lancamentoResource";
import listMeses from '../../services/utils/listMeses';
import { MDBIcon } from "mdbreact";
import Swal from 'sweetalert2'
import { warning }  from  "../../component/Toast";
import {formatarMoeda,formatarMoedaDoble} from "../../services/utils/util";

import { useHistory } from 'react-router-dom';

const useContainer = () => {
  
    const service = new lancamentoResource();

    const descricaoOuGrupo = {
      label: 'Grupo',
      field: 'grupo',
    };
    const history = useHistory();
    const [valores, setValores] = useState(null);
    const [lancamento, setLancamento] = useState(null);
    const [filtroData, setFiltroData] = useState(null);
    const [colunDescricaoOuGrupo, setDescricaoOuGrupo] = useState(descricaoOuGrupo);
    const [ mesSelecionado, setMesSelecionado ] = useState(null);
    const [ urlParameters, setUrlParameters ] = useState(history.location.search);
    
    const {meses} = listMeses();

    const getParametroData = (id) => {
      id = id.replace(/[^\d]+/g,'');
      meses.forEach( mes => {
        if(mes.id == id){
          setMesSelecionado(mes.nome);
        }
      });
    }

    const getMesNome = (nome) => {
      let mesId = 0;
      meses.forEach( mes => {
        if(mes.nome.toUpperCase() == nome){
          mesId = mes.id;
        }
      });
      return mesId;
    }
    
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const coluns = [
        {
          label: 'Categoria',
          field: 'categoria',
          width: 150,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
          },
        },{
          label: colunDescricaoOuGrupo.label,
          field: colunDescricaoOuGrupo.field,
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
        const data = today.toISOString().substring(0,8);
        setUrlParameters(`?dataInicio=${data}01&dataFinal=${data}30`);
        getParametroData(data);
      }

      const detalhes = (lancamento) => {
        setDescricaoOuGrupo({label:"Descrição", field:"descricao"});
        listarLancamentosPorCategoria(lancamento.categoriaId,lancamento.tipo);
      }
      const editar = (lancamento) => {
        lancamento.acoes = null
        lancamento.tipo = lancamento.tipo == "RECEITA" ? 1 : 2;
        lancamento.categoria = lancamento.idCategoria;
        console.log(lancamento);
        history.push("/lancamentos/formulario",lancamento)
      }

      const deletar = (id) => {
        Swal.fire({
          title: 'Deseja deletar esse registro!',
          text: 'Click em continuar ou Cancelar',
          icon: 'question',
          showDenyButton: true,
          confirmButtonText: 'Continuar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            service.delete(id).then(response => {
              Swal.fire('Registro Deletado com sucesso!', '', 'success')
              listarLancamentos();
            }).catch( erro => {
              console.log(erro);
              Swal.fire('Algo deu errado', '', 'info')
            });
          }
        });
        return false;
      
      }

      const listarLancamentos = () => {
        if(lancamento && lancamento.id){
          listarLancamentosPorCategoria();
        }else{
          listarLancamentosAgrupada();
        }
        service.listarValores(urlParameters).then(response => {
          setValores(response.data);
        }).catch(erro => {
          console.log(erro.response);
        });
      }

      const filtro = () => {
        try {
          const dataInicio = filtroData.dataInicio;
          const dataFinal = filtroData.dataFinal;
          if(dataInicio.length == 0){
            warning("Preencha a data Inicio");
            return false;
          }
          if(dataFinal.length == 0){
            warning("Preencha a data Final");
            return false;
          }
          setUrlParameters(`?dataInicio=${dataInicio}&dataFinal=${dataFinal}`);
        } catch (error) {
          warning("Preencha as datas do filtro");
        }
        
      }

      const listarLancamentosAgrupada = () => {
        service.listarAgrupada(urlParameters).then(response => {
          const lancamentos = response.data;
          Object.values(lancamentos).map( lancamento => {
            lancamento.valor = formatarMoeda(lancamento.valor);
            lancamento.acoes =   
            <a className="mr-2" onClick={e => detalhes(lancamento)}>
                <MDBIcon icon="search" />
              </a>   
          });
          setLancamento(lancamentos);
          getParametroData(urlParameters);
        }).catch(erro => {
          console.log(erro.response);
        });
        service.listarValores(urlParameters).then(response => {
          setValores(response.data);
        }).catch(erro => {
          console.log(erro.response);
        });
      }
      const listarLancamentosPorCategoria = (id,tipo) => {
        const parametro = `${urlParameters}&categoria=${id}&tipo=${tipo}`;
        service.listarLancamentoPorCategoria(parametro).then(response => {
          const lancamentos = response.data;
          Object.values(lancamentos).map( lancamento => {
            lancamento.valor = formatarMoeda(lancamento.valor);
            if(lancamento.tipo != "SALDO"){
              lancamento.acoes =   
              <>
                <a className="mr-2" onClick={e => editar(lancamento)}>
                  <MDBIcon icon="edit" />
                </a>
                <a className="ml-2" id={lancamento.id} onClick={e => deletar(lancamento.id)}>
                  <MDBIcon icon="trash-alt" id={lancamento.id} />
                </a>
              </>            
            }
          });
          setLancamento(lancamentos);
          getParametroData(urlParameters);
        }).catch(erro => {
          console.log(erro.response);
        });
        service.listarValores(urlParameters).then(response => {
          setValores(response.data);
        }).catch(erro => {
          console.log(erro.response);
        });
      }
      
      
      useEffect(() => {
        listarLancamentos();
    },[urlParameters]);


    return{
        mesSelecionado:mesSelecionado,
        filtroData:filtroData,
        valores:valores,
        datatable:{
          columns: coluns,
          rows: lancamento ? lancamento : [],
        },
        functions:{
          formatarMoeda,
          setFiltroData,
          filtro,
        }
    }
}

export default useContainer;