import { useHistory } from 'react-router-dom';
import {useState, useEffect} from "react";
import CategoriaResource from "../../services/resource/categoriaResource";
import { success, error } from "../../component/Toast";
import Icon from '@mdi/react';
import { mdiToggleSwitchOff,mdiAccountEdit   } from '@mdi/js'

import { MDBIcon } from "mdbreact";
import Swal from 'sweetalert2'

const useContainer = () => {

    const service = new CategoriaResource();

    const history = useHistory();
    const [categoria, setCategoria] = useState(null);
    const [titulo, setTitulo] = useState(null); 

    const inicialState  = {
        descricao:undefined
    }
    
    const [value, setValue] = useState(inicialState); 

    const coluns = [
        {
          label: 'Descricao',
          field: 'nome',
          width: 150,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
          },
          
        },{
          label: 'Grupo',
          field: 'grupo',
          width: 200,
        },{
          label: 'Ações',
          field: 'acoes',
          width: 200,
        }
      ]

    const editar = (categoria) => {
        categoria.acoes = null;
        categoria.grupo = categoria.grupoId;
        history.push("/categorias/formulario",categoria)
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
              listarCategorias();
            }).catch( erro => {
              Swal.fire('Algo deu errado', '', 'info')
            });
          }
        });
        return false;
      
      }

    const listarCategorias = () => {
        service.listar().then(response => {
          const categorias = response.data;
          Object.values(categorias).map( categoria => {
            categoria.acoes =   
              <>
              <a className="mr-2" id={categoria.id}
               onClick={e => editar(categoria)}>
                <MDBIcon far icon="edit" id={categoria.id} />
              </a>
              <a onClick={e =>  {!isStatus(categoria.ativo) ? AlterarStatus(true, categoria.id) : AlterarStatus(false, categoria.id)}}>
                  <Icon path={mdiToggleSwitchOff } title={isStatus(categoria.ativo) ? "Ativar" : "Desativar"} size={1.3} horizontal color={isStatus(categoria.ativo) ? "green" : "gray"} />
                </a>
              {/* <a className="ml-2" id={categoria.id} onClick={e => deletar(categoria.id)}>
                <MDBIcon far icon="trash-alt" id={categoria.id} />
              </a> */}
              </>            
          });
          setCategoria(categorias);
        }).catch(erro => {
          console.log(erro.response);
        });
     
      }

      const AlterarStatus = (status,id) => {
        const params = `?ativo=${status}&id=${id}`;
        service.atualizarStatus(params).then(response => {
          listarCategorias();
        }).catch(erro => {
          console.log(erro);
        });
      }

      const isStatus = (status) =>{
        return (status === true || status == "Ativo");
      }


    useEffect(()=> {
        if(history.location.state){
            setTitulo("Editar cadastro");
        }else{
            setTitulo("Novo cadastro");
        }
        listarCategorias();
    },[]);

    return{
        rows:categoria ? categoria : [],
        coluns:coluns,
        form:value,
        titulo:titulo,
        categoria:categoria,
        functions:{
            setValue
        }
    }

}

export default useContainer;