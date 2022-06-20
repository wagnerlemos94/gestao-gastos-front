import { Nav, Navbar, Container } from 'react-bootstrap';

const deslogar = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
}

const NavbarProp = (props) => {
    return(
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="">Navbar</Navbar.Brand>
                        <Nav className="me-auto">
                        <Nav.Link href="/lancamentos/formulario">Lançamento</Nav.Link>
                        <Nav.Link href="/categoria/formulario">Categoria</Nav.Link>
                    </Nav>
                    <Nav.Link className="text-light" href="/"  onClick={e => deslogar()}>Sair</Nav.Link>
                </Container>
            </Navbar>
            {props.children}

        </>
    );
}

export default NavbarProp;