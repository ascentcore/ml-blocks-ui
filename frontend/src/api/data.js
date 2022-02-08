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


export const getGraph = async() => {
    return await API.get('/pipeline/graph')
}

export const getStatusOfIp = async (ip) => {
    return await API.get(`/pipeline/proxy?ip=${ip}&path=api/v1/status`)
}