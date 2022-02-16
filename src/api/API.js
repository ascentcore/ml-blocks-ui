import axios from 'axios';

console.log('#####--', process.env)
export const API_BASE = `http://${process.env.REACT_APP_REGISTRY || 'localhost:9080'}/api/v1`;

export default axios.create({
    baseURL: API_BASE,
    responseType: "json"
});