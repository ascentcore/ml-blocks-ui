import React, { useEffect, useRef, useState } from 'react';
import { getStatusOfIp } from '../api/data';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(() => ({
    '@keyframes dash': {
        to: {
            strokeDashoffset: -70,
        }
    },
    path: {
        stroke: '#000',
        fill: 'transparent'
    },
    stroke: {
        strokeDasharray: 5,
        stroke: '#000',
        fill: 'transparent',
        animation: `$dash linear infinite`,
        animationDuration: '5s'

    },
    circle: {
        stroke: "#000",
        fill: '#fff'
    },
    fill: {
        stroke: "#000",
        fill: 'green'
    },
    rect: {
        strokeWidth: "1",
        fill: "transparent"
    }
}))

function SVGBlock({ block, transform, selected, onClick }) {
    const states = ['statics', 'ingesting', 'processing', 'storing', 'pending'];
    const classes = useStyles();
    const [status, setStatus] = useState();
    const [timer, setTimer] = useState(Date.now());
    const myRef = useRef('');

    const radius = 6;
    const blockWidth = 200
    const blockHeight = 70
    const offset = 30

    useEffect(() => {
        async function fetchData() {
            const response = await getStatusOfIp(block.ip)
            setStatus(response.data)
        }
        fetchData()
    }, [timer])


    myRef.current = () => {
        if (!status) return
        states.map(item => (
            <></>
        ))
    }

    useEffect(() => {
        if (!status) return
        const interval = setInterval(() => {
            console.log('status', status.status[0].state_name)
            myRef.current()
        }, 5000);
        return () => clearInterval(interval)
    }, [])

    function getUpstream(upstreamBlock) {
        const [ux, uy] = upstreamBlock.location
        const [dx, dy] = block.location
        let str = `
            M ${ux + blockWidth + radius} ${uy + offset}
              ${dx - radius} ${dy + offset}`

        return (<path d={str} stroke="#000" fill="transparent" strokeWidth={1} />)
    }

    return (
        <g transform={transform}>
            {status && (
                <g>
                    <g transform={`translate(${block.location[0]}, ${block.location[1]})`}>
                        <text textAnchor='middle' x={blockWidth / 2}>{status.name}</text>
                        <rect stroke="#000" x={0} y={10} width={blockWidth} height={blockHeight} stroke={!selected ? "#000" : '#1c05cf'} className={classes.rect} onClick={onClick} />
                        {status.status.map(state => (
                            <>
                                <circle cx="0" cy="30" r={radius} className={(state.state_name === states[1] || state.state_name === states[2]) ? classes.fill : classes.circle} />
                                <path d="M 6 30 H 100 " className={(state.state_name === states[2]) ? classes.stroke : classes.path} markerEnd="url(#arrow-1)" />
                                <circle cx="100" cy="30" r="8" className={state.state_name === states[2] ? classes.fill : classes.circle} />
                                <path d="M 200 30 H 108 " className={classes.path} markerEnd="url(#arrow-2)" />
                                <circle cx="200" cy="30" r={radius} className={state.state_name === states[4] ? classes.fill : classes.circle} />
                                <path d="M 100 38 C 100 72, 90 65, 200 65" className={state.state_name === state[3] ? classes.stroke : classes.path} markerEnd="url(#arrow-3)" />
                                <circle cx="200" cy="65" r={radius} className={state.state_name === states[4] ? classes.fill : classes.circle} />
                                <defs>
                                    <marker id="arrow-1" markerWidth="10" markerHeight="10" refX="12" refY="4">
                                        <path d="M0,0 L4,4 L0,8 z" fill="#000"></path>
                                    </marker>
                                </defs>
                                <defs>
                                    <marker id="arrow-2" markerWidth="10" markerHeight="10" refX="-82" refY="4">
                                        <path d="M0,0 L4,4 L0,8 z" fill="#000"></path>
                                    </marker>
                                </defs>
                                <defs>
                                    <marker id="arrow-3" markerWidth="10" markerHeight="10" refX="10" refY="4">
                                        <path d="M0,0 L4,4 L0,8 z" fill="#000"></path>
                                    </marker>
                                </defs>
                            </>
                        ))}
                    </g>
                    {Object.values(block.upstream).map(upstreamBlock => getUpstream(upstreamBlock))}
                </g>
            )}
        </g>
    )
};

export default SVGBlock;