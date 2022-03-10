import React, { useEffect, useRef, useState } from 'react';
import { getStatusOfIp, getNodes } from '../api/data';
import { makeStyles } from '@mui/styles';
import { Tooltip } from '@mui/material';


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

    const blockWidth = 15
    const blockHeight = 15
    const offset = 13

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
        const interval = setInterval(() => {
            fetchData()
        }, 5000)
        return () => clearInterval(interval)

    }, [])

    function getUpstream(upstreamEdge) {
        const { block: upstreamBlock, edgeType } = upstreamEdge
        let [ux, uy] = upstreamBlock.location
        let [dx, dy] = block.location
        if (edgeType === 1) {
            uy += 7
            dy += 7
        }

        let [sx, sy, ex, ey] = [ux + blockWidth + 21, uy + offset, dx + 19, dy + offset]

        let str = `
            M ${sx} ${sy}
            C ${sx + 13} ${sy}, ${ex - 17} ${ey}
              ${ex} ${ey}`

        return (<path
            key={upstreamBlock.ip}
            d={str}
            className={classes.path} fill="transparent" strokeWidth={1} />)
    }

    const [name, setName] = React.useState()

    React.useEffect(() => {
        async function fetchData() {
            const response = await getNodes()
            return setName(response.data)
        }
        fetchData()
    }, [])


    let arr = [];
    if (name) {
        name.forEach(element => {
            arr.push(element.name)
        });
    }

    let blockIP = [];
    if (name) {
        name.forEach(element => {
            blockIP.push(element.host)
        });
    }

    let x = 0;
    let blockName = ''
    while (x < blockIP.length) {
        if (block.ip === blockIP[x]) { blockName = arr[x] }
        x++;
    }

    return (
        <Tooltip title={blockName} disableFocusListener disableTouchListener  >
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
        </Tooltip>
    )
};

export default SVGMinimap;