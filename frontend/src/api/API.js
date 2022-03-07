import axios from 'axios';
import { useSelector } from 'react-redux';
export const API_BASE = `/`;

export default axios.create({
    baseURL: API_BASE,
    responseType: "json"
});

export const setTargetIP = (ip) => {
    localStorage.setItem('IP', ip)
}


export const getTargetIP = () => {
    const storeIP = useSelector((state) => state.ip.value);
    localStorage.getItem('IP');
    return storeIP;
}