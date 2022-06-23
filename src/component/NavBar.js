import { Nav, Navbar, Container } from 'react-bootstrap';
import Deslogar from '../services/utils/deslogar';


const NavbarProp = (props) => {

    const deslogar = Deslogar();
    
    return(
        <>
            <Navbar bg="primary" variant="dark" expand='sm' >
                <Container>
                    <Navbar.Brand href=""></Navbar.Brand>
                        <Nav className="me-auto">
                        <Nav.Link href="/lancamentos">Lançamento</Nav.Link>
                        <Nav.Link href="/categoria/formulario">Categoria</Nav.Link>
                    </Nav>
                    <Nav.Link className="text-light" onClick={e => deslogar.index()}>Sair</Nav.Link>
                </Container>
            </Navbar>
            {props.children}

        </>
    );
}

export default NavbarProp;