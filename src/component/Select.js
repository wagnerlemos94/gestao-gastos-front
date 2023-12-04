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
            <option disabled selected={!props.selected}>{props.placeholder ? props.placeholder : "Selecione..."}</option>
                {
                    props.array.map((value, index) => {
                        return <>
                        <option selected={(props.selected == value.id || props.selected == value.nome)} name={props.name} value={value.id}>{value.nome}</option>
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