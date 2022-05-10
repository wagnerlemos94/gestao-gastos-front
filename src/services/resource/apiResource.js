import axios from 'axios';
import { useHistory } from 'react-router-dom';

const baseURL = 'http://localhost:8080';
const token = localStorage.getItem('token');

// const config = {
//     headers: {
//         'Authorization': 'Basic YWxnYXdvcmtzOjEyMw==',
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }
// }

const config = {
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}` 
    }
}

class ApiResource{
    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return axios["post"](requestUrl, config);
    }
    
    put(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return axios["put"](requestUrl, config);
    }
    
    delete(url){
        const requestUrl = `${this.apiurl}${url}`
        return axios["delete"](requestUrl, config);
    }
    
    get(url){
        const requestUrl = `${baseURL}${this.apiurl}`;
        return axios["get"](requestUrl, config);
    }

    logar(body){

        const configLogin = {
            headers: {
                'Authorization': 'Basic YWxnYXdvcmtzOjEyMw==',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const requestUrl = `${baseURL}/oauth/token`;
        return axios["post"](requestUrl, body, configLogin);
    }
}


export default ApiResource;