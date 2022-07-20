import { useHistory } from 'react-router-dom';
import {useState, useEffect} from "react";
import GrupoResource from "../../services/resource/GrupoResource";
import { success, error } from "../../component/Toast";

import { MDBIcon } from "mdbreact";
import Swal from 'sweetalert2'

const useContainer = () => {

    const grupoResource = new GrupoResource();

    const history = useHistory();
    const [grupo, setGrupo] = useState(null);
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
          label: 'Ações',
          field: 'acoes',
          width: 200,
        }
      ]

    const editar = (grupo) => {
        grupo.acoes = null
        history.push("/grupos/formulario",grupo)
      }

      // const deletar = (id) => {
      //   Swal.fire({
      //     title: 'Deseja deletar esse registro!',
      //     text: 'Click em continuar ou Cancelar',
      //     icon: 'question',
      //     showDenyButton: true,
      //     confirmButtonText: 'Continuar',
      //     denyButtonText: `Cancelar`,
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       grupoResource.delete(id).then(response => {
      //         Swal.fire('Registro Deletado com sucesso!', '', 'success')
      //         listarGrupos();
      //       }).catch( erro => {
      //         Swal.fire('Algo deu errado', '', 'info')
      //       });
      //     }
      //   });
      //   return false;
      
      // }

    const listarGrupos = () => {
        grupoResource.listar().then(response => {
          const grupos = response.data;
          Object.values(grupos).map( grupo => {
            grupo.acoes =   
              <>
              <a className="mr-2" id={grupo.id}
               onClick={e => editar(grupo)}>
                <MDBIcon far icon="edit" id={grupo.id} />
              </a>
              {/* <a className="ml-2" id={grupo.id} onClick={e => deletar(grupo.id)}>
                <MDBIcon far icon="trash-alt" id={grupo.id} />
              </a> */}
              </>            
          });
          setGrupo(grupos);
        }).catch(erro => {
          console.log(erro.response);
        });
     
      }


    useEffect(()=> {
        if(history.location.state){
            setTitulo("Editar cadastro");
        }else{
            setTitulo("Novo cadastro");
        }
        listarGrupos();
    },[]);

    return{
        rows:grupo ? grupo : [],
        coluns:coluns,
        form:value,
        titulo:titulo,
        grupo:grupo,
        functions:{
            setValue
        }
    }

}

export default useContainer;