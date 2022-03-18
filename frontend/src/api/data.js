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

export const getNodes = async () => {
    return await API.get('/api/v1/pipeline/hosts')
}

export const reconfigure = async (data) => {
    return await API.post('/api/v1/pipeline/reconfigure', data)
}

export const getGraph = async () => {
    return await API.get('/api/v1/pipeline/graph')
}

export const getReport = async () => {
    return await API.get('/api/v1/status/report')
}

export const getStatusOfIp = async (ip) => {
    return await API.get(`/proxy/${ip}/api/v1/status/`)
}

export const getSettingsSchema = async (ip) => {
    return await API.get(`/proxy/${ip}/api/v1/status/settings_schema`)
}

export const getSchemaForBlock = async ip => {
    return await API.get(`/proxy/${ip}/api/v1/model/predict_schema`)
}

export const predict = async (ip, data) => {
    return await API.post(`/proxy/${ip}/api/v1/model/predict`, data)
}

export const saveSettings = async (ip, data) => {
    return await API.post(`/proxy/${ip}/api/v1/status/settings`, data)
}

export const train = async (ip) => {
    return await API.post(`/proxy/${ip}/api/v1/model/train`)
}

export const getSettings = async (ip) => {
    return await API.get(`/proxy/${ip}/api/v1/status/settings`)
}


export const predict_bg = async (ip, data) => {    
    return await API.post(`/proxy/${ip}/api/v1/model/predict_bg`, data)
}

export const getProxy = async (ip, path) => {
    return await API.get(`/proxy/${ip}/${path}`)
}

export const pipelineRebuild = async (ip) => {
    return await API.post(`/proxy/${ip}/api/v1/pipeline/rebuild`)
}

export const recreateGraph = async () => {
    return await API.delete('/api/v1/pipeline/graph')
}

export const download = async (file) => {
    return await API.get(`/download/${file}`)
}

export const upload = async (ip, data) => {
    var formData = new FormData();
    formData.append("append", data.append)
    data.files.forEach(file => {
        formData.append("files", file)
    })
    return await API.post(`/proxy/${ip}/api/v1/data/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}