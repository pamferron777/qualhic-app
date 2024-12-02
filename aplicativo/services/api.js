import axios from 'axios';
import confEnv from './../env.json';


const defaultConnection = () => {
    return axios.create({
        baseURL: confEnv.url_base,
        timeout: 6000
    });
}
const connection = (token) => {
   try {
    return axios.create({
        baseURL: confEnv.url_base,
        timeout: 6000,
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
   } catch(Ex) {
    throw new Error("Não foi possível completar sua solicitação");
   }
}



export {
    defaultConnection, axios, connection
}