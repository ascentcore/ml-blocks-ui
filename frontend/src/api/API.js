import axios from 'axios';

export const API_BASE = `http://localhost:9080/api/v1`;

export default axios.create({
    baseURL: API_BASE,
    responseType: "json"
});

export const setTargetIP = (ip) => localStorage.setItem('IP', targetIP = ip);

export const getTargetIP = () => localStorage.getItem('IP')