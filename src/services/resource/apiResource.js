import axios from 'axios';
import Deslogar from '../utils/deslogar';

const baseURL = 'http://localhost:8080';


class ApiResource {
    constructor(apiurl){
        this.deslogar = Deslogar();
        this.apiurl = apiurl;
        this.config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}` 
            }
        }
    }    
    

    post(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return axios["post"](requestUrl, this.config);
    }
    
    put(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return axios["put"](requestUrl, this.config);
    }
    
    delete(url){
        const requestUrl = `${this.apiurl}${url}`
        return axios["delete"](requestUrl, this.config);
    }
    
    get(rota,param){
        const requestUrl = `${baseURL}${this.apiurl}${rota}${param}`;
        return axios["get"](requestUrl, this.config);
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

    expirationToken(invalidToken){
        if(invalidToken === "invalid_token"){
            this.deslogar.index();
        }
    }
}


export default ApiResource;