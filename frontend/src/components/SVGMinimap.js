import React, { useEffect, useRef, useState } from 'react';
import { getStatusOfIp } from '../api/data';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
    '@keyframes dash': {
        to: {
            strokeDashoffset: -70,
        }
    },
    '@keyframes loading': {
        '0%': {
            fill: '#FFF',
        },
        '30%': {
            fill: '#8ad18c',
        },
        '60%': {
            fill: '#8ad18c',
        },
        '100%': {
            fill: '#FFF',
        }
    },
    path: {
        stroke: '#000',
        fill: 'transparent'
    },
    rect: {
        stroke: "#1aad58",
        strokeWidth: "1 ",
        fill: '#1aad58'
    },
    selectedRect: {
        fill: "#1aad58",
        stroke: '#fff',
        strokeWidth: '2px',
        outline: '2px solid #1aad58',
        position: 'absolute'
    }
}))

function SVGMinimap({ block, transform, selected, onClick }) {
    const classes = useStyles();
    const [status, setStatus] = useState();
    const [state, setState] = useState();
    const [timer, setTimer] = useState(Date.now());

    const blockWidth = 20
    const blockHeight = 20
    const offset = 20

    useEffect(() => {
        async function fetchData() {
            const response = await getStatusOfIp(block.ip)
            if (response.data.status && response.data.status.length) {
                setState(response.data.status[0])
                setStatus(response.data)
            }
        }
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, 5000)
        return () => clearInterval(interval)

    }, [timer])

    function getUpstream(upstreamBlock) {
        const [ux, uy] = upstreamBlock.location
        const [dx, dy] = block.location
        let str = `
            M ${ux + blockWidth + 55} ${uy + offset}
              ${dx - 15} ${dy + offset}`
        return (<path
            key={upstreamBlock.ip}
            d={str}
            className={classes.path} fill="transparent" strokeWidth={1} />)
    }

    return (
        <g transform={transform}>
            {status && (
                <g >
                    <g transform={`translate(${block.location[0]}, ${block.location[1]})`}>
                        <rect x={20} y={10} width={blockWidth} height={blockHeight} className={selected ? classes.selectedRect : classes.rect} onClick={onClick} />
                    </g>
                    {Object.values(block.upstream).map(upstreamBlock => getUpstream(upstreamBlock))}
                </g>
            )
            }
        </g >
    )
};

export default SVGMinimap;