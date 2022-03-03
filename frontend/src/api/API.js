import axios from 'axios';
import { setIPReducer } from '../redux/ip-reducer';
import { useSelector } from 'react-redux';
export const API_BASE = `/`;

export default axios.create({
    baseURL: API_BASE,
    responseType: "json"
});

export const getTargetIP = () => {
    const storeIP = useSelector((state) => state.ip.value);
    return storeIP;
}