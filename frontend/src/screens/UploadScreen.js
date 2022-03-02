import { SchemaForm } from '@ascentcore/react-schema-form';
import React from 'react';
import { getTargetIP } from '../api/API';
import { makeStyles } from '@mui/styles';
import customRegistry from '../components/SchemaForm/CustomRegistry';
import schema from '../components/SchemaForm/upload-schema.json'
import { Paper } from '@mui/material';
// import { upload } from '../api/data';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'block',

        '& .ra-elem-array': {
            width: '100%'
        },

        '& .ra-submit-button': {
            width: '100%'
        }
    }
}))

const UploadScreen = () => {
    const classes = useStyles();
    let ip = getTargetIP();

    const onSubmit = data => {
        const ip = getTargetIP()
        // upload(ip, data)
    }

    return (
        <>
            <h2>Upload</h2>
            <Paper sx={{p:2}}>
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

export default UploadScreen;