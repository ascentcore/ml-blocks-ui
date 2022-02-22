import React, { useEffect, useState } from 'react';
import { getTargetIP } from '../api/API';
import * as getIP from '../api/data';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    grid: {
        marginTop: '60px'
    }
}))

const StaticsScreen = () => {
    const classes = useStyles();
    const [value, setValue] = useState();
    const [path, setPath] = useState('');
    let ip = getTargetIP()

    useEffect(() => {
        if (ip === undefined && path === '') return
        async function fetchData() {
            const response = await getIP.getProxy(ip, 'api/v1/statics/')
            return setValue(response.data)
        }
        fetchData();

    }, [ip]);

    return (
        <>
            {value}
        </>
    )
}

export default StaticsScreen;