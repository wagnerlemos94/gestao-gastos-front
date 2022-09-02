import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap';
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
        <Navbar bg="light"  className='mb-1 pl-1 py-1' expand="sm" >
            <Navbar.Brand href=""></Navbar.Brand>
                <Nav className="">
                    {
                        meses.map((value,index) => {
                            return <Nav.Link key={value.id} className='ml-2 text-primary' onClick={() => mes(value)}>{value.nome}</Nav.Link>
                        })
                    }
            </Nav>                
            {props.children}
        </Navbar>
    );
}

export default NavB;