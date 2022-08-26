import { Nav, Navbar, Container } from 'react-bootstrap';
import {Deslogar} from '../services/utils/util';
import { useHistory } from 'react-router-dom';
import { Dropdown } from "react-bootstrap";
import {useState, useEffect} from "react";
import { MDBIcon } from 'mdbreact';

const NavbarProp = (props) => {

    const history = useHistory();

    const stateInicio = {
        nome:"",
        login:""
    }
    const [usuarioLogado, setUsuarioLogado] = useState(stateInicio);
    useEffect(()=> {
        setUsuarioLogado(JSON.parse(localStorage.getItem('usuarioLogado')));       
    },[]);

    const usuario = () => {
        history.push('/usuarios');
    }

    return(
        <>
            <Navbar bg="primary" variant="dark" expand='sm' >
                <Container>
                    <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
                        <Nav className="me-auto">
                        <Nav.Link href="/lancamentos">Lançamento</Nav.Link>
                        <Nav.Link href="/categorias">Categoria</Nav.Link>
                    </Nav>
                    <Dropdown>
                        <Dropdown.Toggle className="btn-sm" id="dropdown-basic">
                            <MDBIcon fas icon="user-cog fa-lg" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <div className="">
                                <Nav.Link className="text-dark mx-1 pt-1 pb-1">{usuarioLogado.nome}</Nav.Link>
                                <Nav.Link className="text-dark mx-1 pt-1 pb-1" onClick={e => usuario()}>Editar</Nav.Link>
                                <Nav.Link className="text-dark mx-1 pt-1 pb-1" onClick={e => Deslogar()}>Sair</Nav.Link>
                            </div> 
                        </Dropdown.Menu>
                    </Dropdown>                    
                </Container>
            </Navbar>
            {props.children}

        </>
    );
}

export default NavbarProp;