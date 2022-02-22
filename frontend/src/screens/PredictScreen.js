import { SchemaForm } from '@ascentcore/react-schema-form';
import { Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getTargetIP } from '../api/API';
import { makeStyles } from '@mui/styles';
import { getSchemaForBlock } from '../api/data';
import customRegistry from '../components/SchemaForm/CustomRegistry';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
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
            <h2>Predict</h2>
            <Paper sx={{ p: 2 }}>
                {schema && <SchemaForm
                    className={classes.container}
                    schema={schema}
                    onSubmit={onSubmit}
                    config={{ registry: customRegistry }}
                />}
            </Paper>
        </>
    )
}

export default PredictScreen;