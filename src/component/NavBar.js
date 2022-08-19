import { Nav, Navbar, Container } from 'react-bootstrap';
import {Deslogar} from '../services/utils/util';
import { useHistory } from 'react-router-dom';

const NavbarProp = (props) => {

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    console.log(usuarioLogado);

    return(
        <>
            <Navbar bg="primary" variant="dark" expand='sm' >
                <Container>
                    <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
                        <Nav className="me-auto">
                        <Nav.Link href="/lancamentos">Lançamento</Nav.Link>
                        <Nav.Link href="/categorias">Categoria</Nav.Link>
                    </Nav>
                    <Nav.Link className="text-light" >{usuarioLogado.nome}</Nav.Link>
                    <Nav.Link className="text-light" onClick={e => Deslogar()}>Sair</Nav.Link>
                </Container>
            </Navbar>
            {props.children}

        </>
    );
}

export default NavbarProp;