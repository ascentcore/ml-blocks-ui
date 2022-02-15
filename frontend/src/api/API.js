import axios from 'axios';

export const API_BASE = `http://${process.env.REGISTRY || 'localhost:9080'}/api/v1`;

export default axios.create({
    baseURL: API_BASE,
    responseType: "json"
});