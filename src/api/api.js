import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.31.0.3:80/',
  withCredentials: false
});

const options = {
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Access-Control-Allow-Origin' : '*',
  },
  withCredentials: true,
  crossdomain: true
}
export default {
  getCards() {
    return axios.get('https://6409a9fb6ecd4f9e18b75df5.mockapi.io/getstudents');
  },
  getCard(id) {
    return axios.get(`https://6409a9fb6ecd4f9e18b75df5.mockapi.io/getstudents/${id}`);
  },
  // getLogsa() {
  //   return fetch('/api/test');
    // return api.get('/api/information', options)
  // },
  getLogs() {
    return api.get('/api/information', options);
  }
}
