import React, { useEffect, useState } from 'react';
import { getGraph } from '../api/data';
import SVGBlock from '../components/SVGBlock';

const HomeScreen = () => {

    const [graph, setGraph] = useState([])
    const [blocks, setBlocks] = useState([])
    useEffect(() => {
        async function fetchData() {
            const response = await getGraph()
            const localBlocks = []

            const registerBlock = val => {
                if (val !== 'None' && localBlocks.indexOf(val) === -1) {
                    localBlocks.push(val)
                }
            }

            response.data.forEach(({ upstream, downstream }) => {
                registerBlock(upstream)
                registerBlock(downstream)
            });

            console.log(localBlocks)

            setBlocks(localBlocks)

            return setGraph(response.data)
        }
        fetchData();
    }, [])

    const height = 120

    return (
        <svg width={300} height={blocks.length * height} style={{marginTop: 100}}>
            {blocks.map((ip, index) => (<SVGBlock ip={ip} key={ip} transform={`translate(10, ${index * height + 30})`} />))}
        </svg>
    )
}

export default HomeScreen;