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
                        return <option value={value.id}>{value.nome}</option>
                    })
                }
        </Form.Select>
        )
    }
        </>
    );

}


export default Select;