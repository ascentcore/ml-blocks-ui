import React, { useEffect, useState } from 'react';
import { getStatusOfIp } from '../api/data';

function SVGBlock({ ip, transform }) {

    const [status, setStatus] = useState()
    const [timer, setTimer] = useState(Date.now())
    useEffect(() => {
        async function fetchData() {
            const response = await getStatusOfIp(ip)
            setStatus(response.data)
        }

        fetchData()
    }, [timer])

    setInterval(() => {
        setTimer(Date.now())
    }, 10000)

    const blockWidth = 200
    const blockHeight = 70

    return <g transform={transform}>
        {status && (
            <g>
                <text textAnchor='middle' x={blockWidth / 2}>{status.name}</text>
                <rect stroke="#000" y={10} strokeWidth="1" width={blockWidth} height={blockHeight} fill="transparent"/>
            </g>
        )}

    </g>
};

export default SVGBlock;