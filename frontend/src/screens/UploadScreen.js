import { SchemaForm } from '@ascentcore/react-schema-form';
import React from 'react';
import { getTargetIP } from '../api/API';
import { makeStyles } from '@mui/styles';
import customRegistry from '../components/SchemaForm/CustomRegistry';
import schema from '../components/SchemaForm/upload-schema.json'
import { Paper } from '@mui/material';
import { upload } from '../api/data';

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
    let storedIP = getTargetIP()
    const onSubmit = data => {
        upload(storedIP, data)
    }

    return (
        <>
            <h2>Upload</h2>
            <hr/>
            {schema && <SchemaForm
                className={classes.container}
                schema={schema}
                onSubmit={onSubmit}
                config={{ registry: customRegistry }}
            />}
        </>
    )
}

export default UploadScreen;