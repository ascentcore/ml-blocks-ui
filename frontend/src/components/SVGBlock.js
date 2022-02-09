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




    return <g transform={transform}>
        {status && (
            <g>
                <g transform={`translate(${block.location[0]}, ${block.location[1]})`}>
                    <text textAnchor='middle' x={blockWidth / 2}>{status.name}</text>
                    <rect stroke="#000" y={10} strokeWidth="1" width={blockWidth} height={blockHeight} fill="transparent" />
                </g>
                {Object.values(block.upstream).map(upstreamBlock => getUpstream(upstreamBlock))}
            </g>
        )}

    </g>
};

export default SVGBlock;