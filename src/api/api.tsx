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
  getLogs() {
    return api.get('/api/log', options);
  },
  getPerformanceCPU(uuid:string) {
    return api.get(`/api/blocks/${uuid}/performance/cpu`, options);
  },
  getPerformanceCPUStats(uuid:string) {
    return api.get(`/api/blocks/${uuid}/performance/cpu_stats`, options);
  },
  getPerformanceMemory(uuid:string) {
    return api.get(`/api/blocks/${uuid}/performance/memory`, options);
  },
  getPerformanceDiskUsage(uuid:string) {
    return api.get(`/api/blocks/${uuid}/performance/disk_usage`, options);
  },
  getPerformanceDiskStats(uuid:string) {
    return api.get(`/api/blocks/${uuid}/performance/disk_stats`, options);
  },
  getPerformanceNetwork(uuid:string) {
    return api.get(`/api/blocks/${uuid}/performance/network`, options);
  },
  getPerformanceGPU(uuid:string) {
    return api.get(`/api/blocks/${uuid}/performance/gpu`, options);
  },
  getPerformance(uuid:string) {
    return Promise.all([
      this.getPerformanceCPU(uuid),
      this.getPerformanceMemory(uuid),
      this.getPerformanceDiskUsage(uuid),
      this.getPerformanceGPU(uuid)
    ])
  }
}
