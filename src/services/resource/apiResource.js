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
    

    post(resource, body){
        console.log(body)
        const requestUrl = `${baseURL}${this.apiurl}${resource}`
        return axios["post"](requestUrl, body, this.config);
    }
    
    put(resource, body){
        const requestUrl = `${baseURL}${this.apiurl}${resource}`
        console.log(body)
        return axios["put"](requestUrl, body, this.config);
    }
    
    delete(resource){
        const requestUrl = `${baseURL}${this.apiurl}${resource}`
        return axios["delete"](requestUrl, this.config);
    }
    
    get(resource,param){
        const requestUrl = `${baseURL}${this.apiurl}${resource}${param}`;
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