import API from './API';

export const dataCount = async () => {
    return await API.get('/data/count');
}

export const getData = async (page, count) => {
    return await API.get('/data/', {
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

export const getProxy = async (ip, path) => {
    return await API.get(`/proxy/${ip}/${path}`)
}

export const pipelineRebuild = async () => {
    return await API.post('/api/v1/pipeline/rebuild')
}

export const download = async (file) => {
    return await API.get(`/download/${file}`)
}