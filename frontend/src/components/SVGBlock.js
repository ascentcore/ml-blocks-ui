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
    animated_stroke: {
        strokeDasharray: 5,
        stroke: '#000',
        fill: 'transparent',
        animation: `$dash linear infinite`,
        animationDuration: '5s'
    },
    animated_circle: {
        fill: '#8ad18c',
        stroke: '#000',
        strokeWidth: 1,
        animation: `$loading linear infinite`,
        animationDuration: '3s'

    },
    pending_circle: {
        stroke: "#808080",
        fill: '#FAFAFA'
    },
    ready_circle: {
        fill: '#8ad18c',
        stroke: '#000',
        strokeWidth: 1,
    },
    rect: {
        stroke: "#000",
        strokeWidth: "1",
        fill: 'transparent'
    },
    selectedRect: {
        stroke: "#000",
        strokeWidth: "1",
        fill: '#c9c9ff'
    }
}))

function SVGBlock({ block, transform, selected, onClick }) {
    const states = ['ingesting', 'processing', 'storing', 'statics', 'training', 'pending'];
    const classes = useStyles();
    const [status, setStatus] = useState();
    const [state, setState] = useState();
    const [timer, setTimer] = useState(Date.now());
    const [fetching, setFetching] = useState(false)

    const radius = 6;
    const blockWidth = 200
    const blockHeight = 70
    const offset = 30

    useEffect(() => {
        async function fetchData() {
            if (fetching === false) {
                setFetching(true)
                const response = await getStatusOfIp(block.ip)
                if (response.data.status && response.data.status.length) {
                    setState(response.data.status[0])
                    setStatus(response.data)
                }
                setFetching(false)
            }
        }
        fetchData()
        // const interval = setInterval(() => {
        //     fetchData()
        // }, 5000)
        return () => clearInterval(interval)

    }, [timer])

    function isState(index) {
        return state && state.state_name === states[index]
    }

    function getUpstream(upstreamBlock) {
        const [ux, uy] = upstreamBlock.location
        const [dx, dy] = block.location
        let str = `
            M ${ux + blockWidth + radius} ${uy + offset}
              ${dx - radius} ${dy + offset}`
        return (<path
            key={upstreamBlock.ip}
            d={str}
            className={isState(0) ? classes.animated_stroke : classes.path} fill="transparent" strokeWidth={1} />)
    }

    function getCircleState(circleState) {
        const index = state ? states.indexOf(state.state_name) : -1
        return circleState === index ? classes.animated_circle : circleState > index ? classes.pending_circle : classes.ready_circle
    }

    return (
        <g transform={transform}>
            <g>
                <g transform={`translate(${block.location[0]}, ${block.location[1]})`}>
                    <text textAnchor='middle' x={blockWidth / 2}>{status ? status.name : 'Status Pending...'}</text>
                    <rect x={0} y={10} width={blockWidth} height={blockHeight} className={selected ? classes.selectedRect : classes.rect} onClick={onClick} />
                    <circle cx="0" cy="30" r={radius} className={getCircleState(0)} />

                    <path d="M 6 30 H 100 " className={isState(1) ? classes.animated_stroke : classes.path} markerEnd="url(#arrow-1)" />
                    <circle cx="100" cy="30" r="8" className={getCircleState(1)} />

                    <path d="M 200 30 H 108 " className={classes.path} markerEnd="url(#arrow-2)" />
                    <circle cx="200" cy="30" r={radius} className={getCircleState(3)} />

                    <path d="M 100 38 C 100 72, 90 65, 200 65" className={isState(4) ? classes.animated_stroke : classes.path} markerEnd="url(#arrow-3)" />
                    <circle cx="200" cy="65" r={radius} className={getCircleState(4)} />
                </g>
                {Object.values(block.upstream).map(upstreamBlock => getUpstream(upstreamBlock))}
            </g>
        </g>
    )
};

export default SVGBlock;