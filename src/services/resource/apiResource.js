import axios from 'axios';
import {expirationToken} from "../utils/util";

// const baseURL = 'http://localhost:8080';
// const baseURL = 'https://financeiro-gastos-api.herokuapp.com';
// const baseURL = 'https://gestao-financeira-359011.uc.r.appspot.com';
const baseURL = 'http://34.168.254.192:8080';
// const baseURL = 'http://35.230.115.168:8080';

class ApiResource {
    constructor(apiurl){
        this.apiurl = apiurl;
    }   
    
    getConfig(){
        return {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}` 
            }
        }
    }
    

    post(resource, body){
        expirationToken();
        const requestUrl = `${baseURL}${this.apiurl}${resource}`
        return axios["post"](requestUrl, body, this.getConfig());
    }
    
    put(resource, body){
        expirationToken();
        const requestUrl = `${baseURL}${this.apiurl}${resource}`
        console.log(body)
        return axios["put"](requestUrl, body, this.getConfig());
    }
    
    delete(resource){
        expirationToken();
        const requestUrl = `${baseURL}${this.apiurl}${resource}`
        return axios["delete"](requestUrl, this.getConfig());
    }
    
    get(resource,param){
        expirationToken();
        const requestUrl = `${baseURL}${this.apiurl}${resource}${param}`;
        return axios["get"](requestUrl, this.getConfig());
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
