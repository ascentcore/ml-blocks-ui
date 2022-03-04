import axios from 'axios';
import { setIPReducer } from '../redux/ip-reducer';
import { useSelector, useDispatch } from 'react-redux';
export const API_BASE = `/`;

export default axios.create({
    baseURL: API_BASE,
    responseType: "json"
});

export const setTargetIP = (ip) => {
    return ip
}

export const getTargetIP = () => {
    const storeIP = useSelector((state) => state.ip.value);
    return storeIP;
}