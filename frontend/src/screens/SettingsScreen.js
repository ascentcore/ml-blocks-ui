import { SchemaForm } from '@ascentcore/react-schema-form';
import React, { useEffect, useState } from 'react';
import { getTargetIP } from '../api/API';
import { makeStyles } from '@mui/styles';
import customRegistry from '../components/SchemaForm/CustomRegistry';
import { getGraph, getNodes, reconfigure, getStatusOfIp, getSettingsSchema, saveSettings, getSettings } from '../api/data';

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
    const [settings, setSettings] = useState({})
    const [data, setData] = useState(null)
    const [settingsSchema, setSettingsSchema] = useState(null)

    let storedIP = getTargetIP()

    useEffect(() => {
        async function fetchData() {
            const { data: hosts } = await getNodes()
            const { data: edges } = await getGraph()
            const { data: status } = await getStatusOfIp(storedIP)

            const { operations } = status

            if (operations.indexOf("settings_schema") !== -1) {
                const { data: settingsSchema } = await getSettingsSchema(storedIP)
                const { data: settings } = await getSettings(storedIP)
                setSettingsSchema(settingsSchema)
                setSettings(settings)
            }

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

            edges.forEach(edge => {
                if (edge.downstream === storedIP) {
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

    const onSettingsSubmit = data => {
        saveSettings(storedIP, data)
    }

    return (
        <>
            <h2>Pipeline</h2>
            <hr />
            {schema && <SchemaForm
                className={classes.container}
                schema={schema}
                data={data}
                onSubmit={onSubmit}
                config={{ registry: customRegistry }}
            />}
            {settingsSchema && <>
                <h2>Settings</h2>
                <hr />
                {schema && <SchemaForm
                    className={classes.container}
                    schema={settingsSchema}
                    data={settings}
                    onSubmit={onSettingsSubmit}
                    config={{ registry: customRegistry }}
                />}
            </>}
        </>
    )
}

export default SettingsScreen;