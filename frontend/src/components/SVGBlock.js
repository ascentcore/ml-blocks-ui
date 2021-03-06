import React, { useEffect, useRef, useState } from 'react';
import { getStatusOfIp } from '../api/data';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';

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
            fill: '#80b0ff',
        },
        '60%': {
            fill: '#80b0ff',
        },
        '100%': {
            fill: '#FFF',
        }
    },
    '@keyframes aniloading': {
        '0%': {
            fill: '#c4dbff',
        },
        '45%': {
            fill: '#80b0ff',
        },
        '55%': {
            fill: '#80b0ff',
        },
        '100%': {
            fill: '#c4dbff',
        }
    },

    path: {
        stroke: '#447ead',
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
        fill: '#80b0ff',
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
        fill: '#80b0ff',
        stroke: '#447ead',
        strokeWidth: 1,
    },
    rect: {
        stroke: "#447ead",
        strokeWidth: "1",
        fill: 'transparent'
    },
    selectedRect: {
        stroke: "#447ead",
        strokeWidth: "1",
        fill: '#b8dfff'
    },
    progressAnimation: {
        opacity: 0.5,
        animation: `$aniloading linear infinite`,
        animationDuration: '2s'
    }
}))

function SVGBlock({ block, transform, selected, onClick }) {
    const states = ['ingesting', 'processing', 'storing', 'statics', 'training', 'predicting', 'pending'];
    const classes = useStyles();
    const [status, setStatus] = useState();
    const [state, setState] = useState();

    let report = useSelector(state => state && state.graph && state.graph.statuses && state.graph.statuses.value ? state.graph.statuses.value[block.ip] : {})
    const radius = 4;
    const blockWidth = 150
    const blockHeight = 70
    const offset = 35
    const firstLayerY = 35

    useEffect(() => {
        let fetching = false
        async function fetchData() {
            if (fetching === false) {
                fetching = true
                const response = await getStatusOfIp(block.ip)
                if (response.data) {
                    setState(response.data.status)
                    setStatus(response.data)
                    fetching = false
                }

            }
        }
        fetchData()
    }, [])

    const getState = () => {
        return report ? report.status : state ? state.state_name : undefined
    }

    function isState(index) {
        return getState() === states[index]
    }

    function getCircleState(circleState) {
        const index = states ? states.indexOf(getState()) : -1
        return circleState === index ? classes.animated_circle : circleState > index ? classes.pending_circle : classes.ready_circle
    }

    function getUpstream(upstreamEdge) {
        const { block: upstreamBlock, edgeType } = upstreamEdge
        let [ux, uy] = upstreamBlock.location
        let [dx, dy] = block.location
        if (edgeType === 1) {
            uy += 30
            dy += 30
        }

        let [sx, sy, ex, ey] = [ux + blockWidth + radius + 2, uy + offset, dx - radius - 5, dy + offset]

        let str = `
            M ${sx} ${sy}
            C ${sx + 70} ${sy}, ${ex - 70} ${ey}
              ${ex} ${ey}`

        let className = edgeType === 1 ? classes.dot_stroke : isState(0) ? classes.animated_stroke : classes.path
        return (<path
            key={upstreamBlock.ip}
            d={str}
            className={className}
            fill="transparent"
            markerEnd="url(#arrow-1)"
            strokeWidth={1} />)
    }



    const getProgressComponent = () => {
        if (report && report.progress && report.progress !== '100') {
            const progress = parseInt(report.progress);
            return <g>
                <rect x={1} y={11} rx="3" ry="3" width={blockWidth * progress / 100 - 2} height={blockHeight - 2} className={classes.progressAnimation} />
                <text fontSize={10} textAnchor='middle' x={blockWidth * 0.5} y={blockHeight + 5}>{progress}%</text>
            </g>
        }
    }

    const hasOperation = operation => status && status.operations && status.operations.indexOf(operation) !== -1
    return (
        <g transform={transform}>
            <g transform={`translate(${block.location[0]}, ${block.location[1]})`}>

                <text fontSize={12} textAnchor='middle' x={blockWidth / 2}>{status ? status.name : 'Status Pending...'}</text>
                <text fontSize={10} textAnchor='middle' x={blockWidth / 2} y={blockHeight + 20}>{block.ip}</text>
                <rect x={0} y={10} rx="3" ry="3" width={blockWidth} height={blockHeight} className={selected ? classes.selectedRect : classes.rect} onClick={onClick} />
                {getProgressComponent()}
                <circle cx="0" cy={firstLayerY} r={radius} className={getCircleState(0)} />

                <text fontSize={10} textAnchor='middle' x={blockWidth / 2} y={22}>storage</text>
                <circle cx={blockWidth / 2} cy={firstLayerY} r="8" className={getCircleState(states.indexOf('ingesting'))} />

                <text fontSize={10} textAnchor='start' x={blockWidth + 4} y={27}>data</text>
                <circle cx="0" cy="65" r={radius} className={classes.pending_circle} />


                <path d={`M 6 ${firstLayerY} H ${blockWidth / 2 - 13}`} className={isState(states.indexOf('ingesting')) ? classes.animated_stroke : classes.path} markerEnd="url(#arrow-1)" />


                <path d={`M ${blockWidth / 2 + 10} ${firstLayerY} H ${blockWidth - 9}`} transform={`translate(${blockWidth, 0})`} className={classes.path} markerEnd="url(#arrow-1)" />
                <circle cx={blockWidth} cy={firstLayerY} r={radius} className={getCircleState(states.indexOf('storing'))} />

                {hasOperation('train') && <>
                    <text fontSize={10} textAnchor='middle' x={blockWidth * 0.7} y={53}>model</text>
                    <text fontSize={10} textAnchor='start' x={blockWidth + 4} y={blockHeight + 6}>predict</text>
                    <path d={`M ${blockWidth / 2} ${firstLayerY + 10} C ${blockWidth / 2} 65, ${blockWidth / 2} 65, ${blockWidth / 2 + 16} 65`} className={isState(states.indexOf('training')) ? classes.animated_stroke : classes.path} markerEnd="url(#arrow-1)" />
                    <path d={`M ${blockWidth * 0.7} 65 H ${blockWidth - 9}`} className={isState(states.indexOf('predicting')) ? classes.animated_stroke : classes.path} markerEnd="url(#arrow-1)" />

                    <circle cx={blockWidth / 2 + 30} cy="65" r={radius * 2} className={getCircleState(states.indexOf('training'))} />
                    <circle cx={blockWidth} cy="65" r={radius} className={getCircleState(states.indexOf('predicting'))} />
                </>}
            </g>
            {Object.values(block.upstream).map(upstreamBlock => getUpstream(upstreamBlock))}
        </g>
    )
};

export default SVGBlock;