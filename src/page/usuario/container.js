import { useHistory } from 'react-router-dom';
import {useState, useEffect} from "react";
import UsuarioResource from "../../services/resource/UsuarioResource";
import { success, error } from "../../component/Toast";

import { MDBIcon } from "mdbreact";
import Swal from 'sweetalert2'

const useContainer = () => {

    const service = new UsuarioResource();

    const history = useHistory();
    const [usuario, setUsuario] = useState(null);
    const [titulo, setTitulo] = useState(null); 

    const inicialState  = {
        descricao:undefined
    }
    
    const [value, setValue] = useState(inicialState); 

    const coluns = [
        {
          label: 'Nome',
          field: 'nome',
          width: 150,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
          },
          
        },{
          label: 'Login',
          field: 'login',
          width: 200,
        },
        {
          label: 'Status',
          field: 'status',
          width: 200,
        },
        {
          label: 'Ações',
          field: 'acoes',
          width: 200,
        }
      ]

    const editar = (usuario) => {
        usuario.acoes = null;
        usuario.grupo = usuario.grupoId;
        history.push("/usuarios/formulario",usuario)
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
          Object.values(categorias).map( usuario => {
            usuario.acoes =   
              <>
              <a className="mr-2" id={usuario.id}
               onClick={e => editar(usuario)}>
                <MDBIcon far icon="edit" id={usuario.id} />
              </a>
              {/* <a className="ml-2" id={usuario.id} onClick={e => deletar(usuario.id)}>
                <MDBIcon far icon="trash-alt" id={usuario.id} />
              </a> */}
              </>            
          });
          setUsuario(categorias);
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
        listarCategorias();
    },[]);

    return{
        rows:usuario ? usuario : [],
        coluns:coluns,
        form:value,
        datatable:{
          columns: coluns,
          rows: usuario ? usuario : []
        },
        titulo:titulo,
        usuario:usuario,
        functions:{
            setValue
        }
    }

}

export default useContainer;