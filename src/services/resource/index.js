
import axios from 'axios';

const URL = "http://localhost:8080";

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