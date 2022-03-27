import { Nav, Navbar, Container } from 'react-bootstrap';
import listMeses from '../../services/utils/listMeses';
import { get } from "../../services/resource/index";
import {useState, useEffect} from "react";

import useContainer from "./container";

const NavB = (props) =>{
    const {meses} = listMeses();
    const [lancamento, setLancamento] = useState(null);

    const mes = (mesId) => {
        get('lancamentos?mes='+mesId).then(response => {            
            setLancamento(response.data);
        }).catch(erro => {
            alert("Deu Ruim");
            console.log(erro);
        });
        
        // useEffect(() => {
        // },[]);
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