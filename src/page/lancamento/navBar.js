import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap';
import listMeses from '../../services/utils/listMeses';

const NavB = (props) =>{
    
    const {meses} = listMeses();

    return(
        <Navbar bg="light"  className='mb-1 pl-0 py-0' expand="sm" >
            <Nav className="">
                {
                    meses.map((value,index) => {
                        return <Nav.Link key={value.id} className='ml-1 text-primary' onClick={() => props.onClick(value.id, value.nome)}>{value.nome}</Nav.Link>
                    })
                }
            </Nav>                
            {props.children}
        </Navbar>
    );
}

export default NavB;