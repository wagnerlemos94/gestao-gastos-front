import { Form } from 'react-bootstrap';

const Select = (props) => {

    return(
        <>
        {(!props.array ?
            <Form.Select>
                <option></option>
            </Form.Select>
        
        :
        <Form.Select onChange={props.onChange} required={props.required}>
            <option disabled selected={!props.selected}>Selecione...</option>
                {
                    props.array.map((value, index) => {
                        return <>
                        <option selected={props.selected == value.nome.toUpperCase()} name={props.name} value={value.id}>{value.nome}</option>
                        </>
                        
                    })
                }
        </Form.Select>
        
        )
    }
        </>
    );

}


export default Select;