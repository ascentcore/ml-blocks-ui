import axios from 'axios';
import { useSelector } from 'react-redux';
export const API_BASE = `/`;

export default axios.create({
    baseURL: API_BASE,
    responseType: "json"
});



export const setTargetIP = (ip) => {
    //localStorage.setItem('IP', ip);
    //const storeIP = useSelector((state) => state.ip.value);
}


export const getTargetIP = () => {//localStorage.getItem('IP')
    //const storeIP = useSelector((state) => state.ip.value);
    //return storeIP;
}