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
    dot_stroke: {
        strokeDasharray: 5,
        stroke: '#000',
        fill: 'transparent',
    },
    animated_circle: {
        fill: '#8ad18c',
        stroke: '#000',
        strokeWidth: 1,
        animation: `$loading linear infinite`,
        animationDuration: '2s'

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
    const states = ['ingesting', 'processing', 'storing', 'statics', 'training', 'predicting', 'pending'];
    const classes = useStyles();
    const [status, setStatus] = useState();
    const [state, setState] = useState();
    const [timer, setTimer] = useState(Date.now());

    const radius = 6;
    const blockWidth = 200
    const blockHeight = 70
    const offset = 30

    useEffect(() => {
        fetching = false
        async function fetchData() {
            if (fetching === false) {
                fetching = true
                const response = await getStatusOfIp(block.ip)
                if (response.data.status) {
                    setState(response.data.status)
                    setStatus(response.data)
                    fetching = false
                }
                
            }
        }
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, 5000)
        return () => clearInterval(interval)

    }, [timer])

    function isState(index) {
        return state && state.state_name === states[index]
    }

    function getUpstream(upstreamEdge) {
        const { block: upstreamBlock, edgeType } = upstreamEdge
        let [ux, uy] = upstreamBlock.location
        let [dx, dy] = block.location
        if (edgeType === 1) {
            uy += 35
            dy += 35
        }

        let [sx, sy, ex, ey] = [ux + blockWidth + radius, uy + offset, dx - radius, dy + offset]

        let str = `
            M ${sx} ${sy}
            C ${sx + 70} ${sy}, ${ex - 70} ${ey}
              ${ex} ${ey}`

        let className = edgeType === 1 ? classes.dot_stroke : isState(0) ? classes.animated_stroke : classes.path
        return (<path
            key={upstreamBlock.ip}
            d={str}
            className={className} fill="transparent" strokeWidth={1} />)
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
                    <circle cx="0" cy="65" r={radius} className={classes.pending_circle} />

                    <path d="M 6 30 H 100 " className={isState(1) ? classes.animated_stroke : classes.path} markerEnd="url(#arrow-1)" />
                    <circle cx="100" cy="30" r="8" className={getCircleState(1)} />

                    <path d="M 200 30 H 108 " className={classes.path} markerEnd="url(#arrow-2)" />
                    <circle cx="200" cy="30" r={radius} className={getCircleState(3)} />

                    <path d="M 100 38 C 100 72, 90 65, 200 65" className={isState(5) ? classes.animated_stroke : classes.path} markerEnd="url(#arrow-3)" />
                    <circle cx="200" cy="65" r={radius} className={getCircleState(5)} />
                </g>
                {Object.values(block.upstream).map(upstreamBlock => getUpstream(upstreamBlock))}
            </g>
        </g>
    )
};

export default SVGBlock;