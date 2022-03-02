import axios from 'axios';

export const API_BASE = `/`;

export default axios.create({
    baseURL: API_BASE,
    responseType: "json"
});



export const setTargetIP = (ip) => {
    localStorage.setItem('IP', ip);

}


export const getTargetIP = () => localStorage.getItem('IP')