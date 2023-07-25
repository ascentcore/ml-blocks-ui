import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9082/'
});

const options = {
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  }
}
export default {
  getCards() {
    return axios.get('https://6409a9fb6ecd4f9e18b75df5.mockapi.io/getstudents');
  },
  getCard(id) {
    return axios.get(`https://6409a9fb6ecd4f9e18b75df5.mockapi.io/getstudents/${id}`);
  },
  getLogs() {
    return api.get('/api/log', options);
  }
}
