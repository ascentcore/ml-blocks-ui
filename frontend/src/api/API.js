import axios from 'axios';

export const API_BASE = `http://localhost:9080/api/v1`;

export default axios.create({
    baseURL: API_BASE,
    responseType: "json"
});

let targetIP = undefined;

export const setTargetIP = (ip) => localStorage.setItem('IP', targetIP = ip);

export const getTargetIP = () => targetIP = localStorage.getItem('IP')