import API from './API';

export const dataCount = async (ip) => {
    return await API.get(`/proxy/${ip}/api/v1/data/count`);
}

export const getData = async (ip, page, count) => {
    return await API.get(`/proxy/${ip}/api/v1/data/`, {
        params: {
            page: page,
            count: count
        }
    });
}

export const getGraph = async () => {
    return await API.get('/api/v1/pipeline/graph')
}

export const getStatusOfIp = async (ip) => {
    return await API.get(`/proxy/${ip}/api/v1/status/`)
}

export const getSchemaForBlock = async ip => {
    return await API.get(`/proxy/${ip}/api/v1/model/predict_schema`)
}

export const predict = async (ip, data) => {
    return await API.post(`/proxy/${ip}/api/v1/model/predict`, data)
}

export const predict_bg = async (ip, data) => {
    return await API.post(`/proxy/${ip}/api/v1/model/predict_bg`, data)
}

export const getProxy = async (ip, path) => {
    return await API.get(`/proxy/${ip}/${path}`)
}

export const pipelineRebuild = async () => {
    return await API.post('/api/v1/pipeline/rebuild')
}

export const download = async (file) => {
    return await API.get(`/download/${file}`)
}

export const upload = async (ip, data) => {
    return await API.post(`/proxy/${ip}/api/v1/data/upload`, data.files)
}