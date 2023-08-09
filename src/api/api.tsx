import config from '../config';
import axios from 'axios';

const api = axios.create({
  baseURL: config.backendUrl
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
  },
  postTrainStart(uuid:string) {
    return api.post(`/api/blocks/train/start?uuid=${uuid}`, options);
  },
  getTrainStatus(uuid:string) {
    return api.get(`/api/blocks/train/training_status?uuid=${uuid}`, options);
  },
  postPredict(uuid:string, jsonInput:string) {
    return api.post(`/api/blocks/inference/predict?uuid=${uuid}`,  jsonInput,options);
  },
  getPublish(uuid:string, targetUUID:string, runId=1, epoch=1) {
    return api.get(`/api/blocks/train/publish?uuid=${uuid}&target_uuid=${targetUUID}&run_id=${runId}&epoch=${epoch}`, options);
  },
  getActiveInference(uuid:string) {
    return api.get(`/api/blocks/inference/active?uuid=${uuid}`, options);
  },
  getInferenceList(uuid:string) {
    return api.get(`/api/blocks/inference/list?uuid=${uuid}`, options);
  },
  selectInferenceModel(uuid:string, modelName:string, verison:number) {
    return api.get(`/api/blocks/inference/select?uuid=${uuid}&model_name=${modelName}&model_version=${verison}`, options);
  },
}
