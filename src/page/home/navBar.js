import { Nav, Navbar, Container } from 'react-bootstrap';
import listMeses from '../../services/utils/listMeses';

import { useHistory } from 'react-router-dom';

const NavB = (props) =>{

    const {meses} = listMeses();
    const history = useHistory();

    const mes = (mesId) => {
        history.push({
            search:`?mes=${mesId}`
        })
        window.location.reload();

    }

    return(
        <>
            <Navbar bg="primary" variant="dark" className='mb-2'>
                <Container>
                    <Navbar.Brand href=""></Navbar.Brand>
                        <Nav className="me-auto">
                            {
                                meses.map((value,index) => {
                                    return <Nav.Link className='ml-3' onClick={() => mes(value.id)}>{value.nome}</Nav.Link>
                                })
                            }
                    </Nav>                
                </Container>
            </Navbar>
            {props.children}

        </>
    );
}

export default NavB;