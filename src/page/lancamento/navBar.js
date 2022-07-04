import { Nav, Navbar, Container } from 'react-bootstrap';
import listMeses from '../../services/utils/listMeses';

import { useHistory } from 'react-router-dom';

const NavB = (props) =>{

    const {meses} = listMeses();
    const history = useHistory();

    const mes = (mes) => {
        history.push({
            search:`?mes=${mes.id}`
        })
        window.location.reload();

    }

    return(
        <>
            <Navbar bg="light"  className='mb-2 p-1' expand="sm" >
                <Container>
                    <Navbar.Brand href=""></Navbar.Brand>
                        <Nav className="me-auto">
                            {
                                meses.map((value,index) => {
                                    return <Nav.Link key={value.id} className='ml-3 text-primary' onClick={() => mes(value)}>{value.nome}</Nav.Link>
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