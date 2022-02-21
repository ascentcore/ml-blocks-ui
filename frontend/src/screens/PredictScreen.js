import { SchemaForm } from '@ascentcore/react-schema-form';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getTargetIP } from '../api/API';
import { makeStyles } from '@mui/styles';
import { getSchemaForBlock } from '../api/data';
import customRegistry from '../components/SchemaForm/CustomRegistry';

export const useStyles = makeStyles((theme) => ({
    grid: {
        marginTop: '60px'
    }
}))

const PredictScreen = () => {
    const classes = useStyles();
    let ip = getTargetIP();
    const [schema, setSchema] = useState()

    useEffect(() => {
        if (!ip) return
        async function fetchData() {
            const response = await getSchemaForBlock(ip)
            console.log(response.data)
            setSchema(response.data)
        }
        fetchData();
    }, [ip])

    const onSubmit = data => {
        console.log(data)
    }

    return (
        <>
            {schema && <SchemaForm
                schema={schema}
                onSubmit={onSubmit}
                config={{ registry: customRegistry }}
            />}
        </>
    )
}

export default PredictScreen;