import { Form } from 'react-bootstrap';

const Select = (props) => {

    if(props === null || props === undefined){
        props.array = []
    }

    const selected = (e) => {
        Object.keys(props.onChange).forEach((item) => {
            if(item == props.name){
                props.onChange[item] = e;
            }
          });
    }

    return(
        <>
        {(!props.array ?
            <Form.Select>
                <option></option>
            </Form.Select>
        
        :
        <Form.Select onChange={e => selected(e.target.value)} required={props.required}>
            <option disabled selected>Selecione...</option>
                {
                    props.array.map((value, index) => {
                        return <>
                        <option name={props.name} value={value.id}>{value.nome}</option>
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