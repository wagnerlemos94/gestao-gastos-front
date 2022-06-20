import { useHistory } from 'react-router-dom';

const Deslogar = () => {
    const history = useHistory();
    
    const index = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');    
        history.push('/');
    }

    return {index}

}

export default Deslogar;