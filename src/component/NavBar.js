import { Nav, Navbar, Container } from 'react-bootstrap';
import {Deslogar} from '../services/utils/util';

const NavbarProp = (props) => {

    return(
        <>
            <Navbar bg="primary" variant="dark" expand='sm' >
                <Container>
                    <Navbar.Brand href="/dashboard">Home</Navbar.Brand>
                        <Nav className="me-auto">
                        <Nav.Link href="/lancamentos">Lançamento</Nav.Link>
                        <Nav.Link href="/categorias">Categoria</Nav.Link>
                    </Nav>
                    <Nav.Link className="text-light" onClick={e => Deslogar()}>Sair</Nav.Link>
                </Container>
            </Navbar>
            {props.children}

        </>
    );
}

export default NavbarProp;