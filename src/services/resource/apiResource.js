import axios from 'axios';
import {expirationToken} from "../utils/util";

// const baseURL = 'http://localhost:8080';
// const baseURL = 'http://http://34.129.221.62:8080';
const baseURL = 'https://financeiro-gastos-api.herokuapp.com';

class ApiResource {
    constructor(apiurl){
        this.apiurl = apiurl;
        this.token = localStorage.getItem('token');
        this.config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${this.token}` 
            }
        }
    }    
    

    post(resource, body){
        expirationToken();
        const requestUrl = `${baseURL}${this.apiurl}${resource}`
        return axios["post"](requestUrl, body, this.config);
    }
    
    put(resource, body){
        expirationToken();
        const requestUrl = `${baseURL}${this.apiurl}${resource}`
        console.log(body)
        return axios["put"](requestUrl, body, this.config);
    }
    
    delete(resource){
        expirationToken();
        const requestUrl = `${baseURL}${this.apiurl}${resource}`
        return axios["delete"](requestUrl, this.config);
    }
    
    get(resource,param){
        expirationToken(this.token);
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
}


export default ApiResource;