import { SchemaForm } from '@ascentcore/react-schema-form';
import React, { useEffect, useState } from 'react';
import { getTargetIP } from '../api/API';
import { makeStyles } from '@mui/styles';
import customRegistry from '../components/SchemaForm/CustomRegistry';
import schema from '../components/SchemaForm/settings-schema.json'
import { Paper } from '@mui/material';
import { getGraph, getNodes, reconfigure } from '../api/data';

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

const SettingsScreen = () => {
    const classes = useStyles();

    const [schema, setSchema] = useState(null)
    const [data, setData] = useState(null)
    let storedIP = getTargetIP()

    useEffect(() => {
        async function fetchData() {
            const { data: hosts } = await getNodes()
            const { data: edges } = await getGraph()

            const prepSchema = {
                "title": "Settings",
                "type": "object",
                "properties": {
                    "data": {
                        "title": "Data Dependency",
                        "type": "string",
                        "options": [{ name: 'None', host: undefined }, ...hosts],
                        "labelKey": "name",
                        "valueKey": "host"
                    },
                    "logic": {
                        "title": "Logic Dependency",
                        "type": "array",
                        "items": {
                            "title": "Logic Dependency",
                            "type": "string",
                            "options": hosts,
                            "labelKey": "name",
                            "valueKey": "host"
                        }
                    }

                }
            }

            const localData = { logic: [] }
            const ip = storedIP

            edges.forEach(edge => {
                if (edge.downstream === ip) {
                    if (edge.edge_type === 0) {
                        localData.data = edge.upstream
                    } else {
                        localData.logic.push(edge.upstream)
                    }
                }
            })

            setData(localData)
            setSchema(prepSchema)

        }
        fetchData();
    }, [])


    const onSubmit = data => {
        reconfigure({ current: storedIP, ...data })
    }

    return (
        <>
            <h2>Settings</h2>
            <Paper sx={{ p: 2 }}>
                {schema && <SchemaForm
                    className={classes.container}
                    schema={schema}
                    data={data}
                    onSubmit={onSubmit}
                    config={{ registry: customRegistry }}
                />}
            </Paper>
        </>
    )
}

export default SettingsScreen;