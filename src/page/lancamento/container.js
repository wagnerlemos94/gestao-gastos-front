import {useState, useEffect} from "react";
import lancamentoResource from "../../services/resource/lancamentoResource";
import listMeses from '../../services/utils/listMeses';
import { MDBIcon } from "mdbreact";
import Swal from 'sweetalert2'
import {formatarMoeda,formatarMoedaDoble} from "../../services/utils/util";

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
          label: 'Grupo',
          field: 'grupo',
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

      const detalhes = (lancamento) => {
        listarLancamentosPorCategoria(lancamento.categoriaId,lancamento.tipo);
      }
      const editar = (lancamento) => {
        lancamento.acoes = null
        lancamento.tipo = lancamento.tipo == "RECEITA" ? 1 : 2;
        lancamento.mes = getMesNome(lancamento.mes);
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
          getMesId(urlParameters);
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
        service.listarLancamentoPorCategoria(`${id}/lancamento/${tipo}`).then(response => {
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
          getMesId(urlParameters);
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
        valores:valores,
        datatable:{
          columns: coluns,
          rows: lancamento ? lancamento : [],
        },
        functions:{
          formatarMoeda    
        }
    }
}

export default useContainer;