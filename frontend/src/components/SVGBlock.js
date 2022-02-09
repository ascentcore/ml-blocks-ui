import React, { useEffect, useState } from 'react';
import { getStatusOfIp } from '../api/data';

function SVGBlock({ block, transform }) {

    const [status, setStatus] = useState()
    const [timer, setTimer] = useState(Date.now())

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

    function getUpstream(upstreamBlock) {
        const [ux, uy] = upstreamBlock.location
        const [dx, dy] = block.location
        let str = `
            M ${ux + blockWidth} ${uy + offset}
              ${dx} ${dy + offset}`

        return (<path d={str} stroke="#000" fill="transparent" strokeWidth={1} />)
    }

    return (
        <>
            <g transform={transform}>
                {status && (
                    <g>
                        <g transform={`translate(${block.location[0]}, ${block.location[1]})`}>
                            <text textAnchor='middle' x={blockWidth / 2}>{status.name}</text>
                            <rect stroke="#000" x={0} y={10} strokeWidth="1" width={blockWidth} height={blockHeight} fill="transparent" />
                            {status?.status[0].state_name === 'pending'
                                ? <circle cx="0" cy="30" r="6" stroke="#000" fill='green' />
                                : <circle cx="0" cy="30" r="6" stroke="#000" fill='#fff' />
                            }
                            <path d="M 6 30 H 100 " fill="transparent" stroke="#000" />
                            <circle cx="100" cy="30" r="8" stroke="#000" fill='#fff' />
                            <path d="M 200 30 H 108 " fill="transparent" stroke="#000" />
                            <circle cx="200" cy="30" r="6" stroke="#000" fill='#fff' />
                            <path d="M 100 38 C 104 75, 90 65, 200 65" stroke="#000" fill="transparent" />
                            <circle cx="200" cy="65" r="6" stroke="#000" fill='#fff' />
                        </g>
                        {Object.values(block.upstream).map(upstreamBlock => getUpstream(upstreamBlock))}
                    </g>
                )}
            </g>
        </>
    )
};

export default SVGBlock;