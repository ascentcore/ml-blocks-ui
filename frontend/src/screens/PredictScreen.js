import { SchemaForm } from '@ascentcore/react-schema-form';
import { Grid, Paper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { getTargetIP } from '../api/API';
import { makeStyles } from '@mui/styles';
import { getSchemaForBlock, predict_bg } from '../api/data';
import customRegistry from '../components/SchemaForm/CustomRegistry';
import MUIWrapper from '../components/SchemaForm/Components/wrappers/MUIWrapper';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',

        '& .ra-elem-array': {
            display: 'block',
            width: '100%'
        }
    }
}))

let lastChanged = false

function ScribbleComponent({ property, value, onChange }) {

    const BLOCK_SIZE = 10

    const width = property.width * BLOCK_SIZE
    const height = property.height * BLOCK_SIZE

    const canvasRef = useRef(null)

    const [data, setData] = useState(new Array(property.width * property.height).fill(0))
    const [mouseDown, setMouseDown] = useState(false)



    useEffect(() => {

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)



        for (let i = 0; i < property.width; i++) {
            for (let j = 0; j < property.height; j++) {
                ctx.strokeStyle = '#808080';
                if (data[j * property.width + i] === 1) {
                    ctx.fillStyle = '#000'
                } else {
                    ctx.fillStyle = '#FFF'
                }

                ctx.fillRect(i * BLOCK_SIZE, j * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
                ctx.strokeRect(i * BLOCK_SIZE, j * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
            }
        }


    }, [data])

    const handleClick = event => {
        if (mouseDown) {
            const canvas = canvasRef.current
            const rect = canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top

            const col = Math.floor(x / BLOCK_SIZE)
            const row = Math.floor(y / BLOCK_SIZE)
            const currentPos = row * property.width + col
            if (lastChanged !== currentPos) {
                lastChanged = currentPos
                data[lastChanged] = data[lastChanged] === 1 ? 0 : 1
                const newData = [...data]
                setData(newData)
                onChange(newData)
            }
        }
    }

    const handleMouseOp = val => () => {
        setMouseDown(val)
    }

    return (
        <canvas
            ref={canvasRef}
            width={property.width * BLOCK_SIZE}
            height={property.height * BLOCK_SIZE}
            onMouseDown={handleMouseOp(true)}
            onMouseUp={handleMouseOp(false)}
            onMouseMove={handleClick}
        />
    )
}
const PredictScreen = () => {
    const classes = useStyles();
    let ip = getTargetIP();
    const [schema, setSchema] = useState()

    const exceptions = {
        keys: {
            base64image: { component: ScribbleComponent, wrapper: MUIWrapper },
        }
    }

    useEffect(() => {
        if (!ip) return
        async function fetchData() {
            const response = await getSchemaForBlock(ip)
            setSchema(response.data)
        }
        fetchData();
    }, [ip])

    const onSubmit = data => {
        predict_bg(ip, data)
    }

    return (
        <>
            <h2>Predict</h2>
            <Paper sx={{ p: 2 }}>
                {schema && <SchemaForm
                    className={classes.container}
                    schema={schema}
                    onSubmit={onSubmit}
                    config={{ registry: customRegistry, exceptions: exceptions }}
                />}
            </Paper>
        </>
    )
}

export default PredictScreen;