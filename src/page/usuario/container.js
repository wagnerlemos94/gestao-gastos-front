import { useHistory } from 'react-router-dom';
import {useState, useEffect} from "react";
import UsuarioResource from "../../services/resource/UsuarioResource";
import { success, error } from "../../component/Toast";
import Icon from '@mdi/react';
import { mdiToggleSwitchOff,mdiAccountEdit   } from '@mdi/js'

import { MDBIcon } from "mdbreact";
import Swal from 'sweetalert2'

const useContainer = () => {

    const service = new UsuarioResource();

    const history = useHistory();
    const [usuario, setUsuario] = useState(null);
    const [titulo, setTitulo] = useState(null); 

    const inicialState  = {
      nome:"",
      login:"",
      senha:"",
      status:""
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
        },{
          label: 'Email',
          field: 'email',
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
      usuario.root = null;
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
              listarUsuarios();
            }).catch( erro => {
              Swal.fire('Algo deu errado', '', 'info')
            });
          }
        });
        return false;
      
      }

    const listarUsuarios = () => {
        service.listar().then(response => {
          const usuarios = response.data;
          Object.values(usuarios).map( usuario => {
            usuario.status = isStatus(usuario.status) ? "Ativo" : "Inativo"; 
            usuario.acoes =   
              <>
                <a className="mr-2" id={usuario.id}
                onClick={e => editar(usuario)}>
                  <MDBIcon far icon="edit" id={usuario.id} />
                </a>
                <a onClick={e =>  {!isStatus(usuario.status) ? AlterarStatus(true, usuario.id) : AlterarStatus(false, usuario.id)}}>
                  <Icon path={mdiToggleSwitchOff } title={isStatus(usuario.status) ? "Ativar" : "Desativar"} size={1.3} horizontal color={isStatus(usuario.status) ? "green" : "gray"} />
                </a>
                {/* <a className="ml-2" id={usuario.id} onClick={e => deletar(usuario.id)}>
                  <MDBIcon far icon="trash-alt" id={usuario.id} />
                </a> */}
              </>      
                   
          });
          setUsuario(usuarios);
        }).catch(erro => {
          console.log(erro.response);
        });
     
      }
      const AlterarStatus = (status,id) => {
        const params = `?ativo=${status}&id=${id}`;
        service.atualizarStatus(params).then(response => {
          listarUsuarios();
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
        listarUsuarios();
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