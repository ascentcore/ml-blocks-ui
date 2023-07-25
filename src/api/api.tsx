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
  getBlocks(uuid?:string) {
    let url = '/api/blocks'
    if(uuid) url += `?uuid=${uuid}`;
    return api.get(url);
  },
  registerVM(data: {ip:string, port?:number}) {
    let  url =`/api/blocks?ip=${data.ip}`;
    if(data.port) url += `&port=${data.port}`;
    return api.put(url);
  },
  deleteBlock(uuid:string) {
    return api.delete(`/api/blocks?uuid=${uuid}`);
  },
  getCards() {
    return axios.get('https://6409a9fb6ecd4f9e18b75df5.mockapi.io/getstudents');
  },
  getCard(id:string) {
    return axios.get(`https://6409a9fb6ecd4f9e18b75df5.mockapi.io/getstudents/${id}`);
  },
  getLogs() {
    return api.get('/api/log', options);
  }
}
