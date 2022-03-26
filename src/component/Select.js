import { Form } from 'react-bootstrap';
const Select = (props) => {

    if(props === null || props === undefined){
        props.array = []
    }

    return(
        <>
        {(!props.array ?
            <Form.Select>
                <option></option>
            </Form.Select>
        
        :
        <Form.Select>
                {
                    props.array.map((value, index) => {
                        return <option name={props.name} onChange={props.onChange} value={value.id}>{value.nome}</option>
                    })
                }
        </Form.Select>
        )
    }
        </>
    );

}


export default Select;