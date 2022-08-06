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
                        <optgroup label={value.nome}>
                            {
                                 value.categorias.map((value, index) => {
                                    return <option selected={props.selected == value.id} name={props.name} value={value.id}>{value.nome}</option>
                                  })
                            }
                        </optgroup>
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