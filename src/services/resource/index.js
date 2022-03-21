
import axios from 'axios';

const URL = "http://localhost:8080";

// const token = JSON.parse(localStorage.getItem('token'));
const token = localStorage.getItem('token');

export const post = (resource, body) => {

    let request = 'post';
    let url = `${URL}/${resource}`;  

    const config = {
        headers: {
            'Authorization': 'Basic YWxnYXdvcmtzOjEyMw==',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    
    return axios[request](url, body, config);
};

export const get = (resource) => {

    let request = 'get';
    let url = `${URL}/${resource}`;  

    const config = {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}` 
        }
    }
    
    return axios[request](url, config);
};
