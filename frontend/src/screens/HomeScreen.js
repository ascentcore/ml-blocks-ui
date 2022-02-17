import React, { useEffect, useState } from 'react';
import { getTargetIP, setTargetIP } from '../api/API';
import { getGraph } from '../api/data';
import SVGBlock from '../components/SVGBlock';

const HomeScreen = () => {

    const [graph, setGraph] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [ip, setIP] = useState(getTargetIP());

    useEffect(() => {
        async function fetchData() {
            const response = await getGraph()
            const localBlocks = []
            const blocks = {}

            const registerBlock = (ip) => {
                let block = blocks[ip]

                if (ip !== 'None' && !blocks[ip]) {
                    block = {
                        ip,
                        location: [0, 20],
                        downstream: {},
                        upstream: {}
                    }

                    blocks[ip] = block

                    localBlocks.push(block)
                }

                return block
            }

            response.data.forEach(({ upstream, downstream }) => {
                const upstreamBlock = registerBlock(upstream)
                const downstreamBlock = registerBlock(downstream, true)
                if (upstreamBlock && downstreamBlock) {
                    upstreamBlock.downstream[downstreamBlock.ip] = downstreamBlock
                    downstreamBlock.upstream[upstreamBlock.ip] = upstreamBlock
                }
            });

            function repositionDownstream(currentBlock) {
                let lastYVal = currentBlock.location[1]
                Object.values(currentBlock.downstream).forEach((block, index) => {
                    const [cx, cy] = currentBlock.location
                    block.location = [cx + 300, cy + 140 * index]
                    lastYVal = Math.max(lastYVal, repositionDownstream(block))
                })

                return lastYVal
            }

            let lastYVal = 30
            localBlocks.forEach(block => {
                if (Object.keys(block.upstream).length === 0) {
                    block.location[1] = lastYVal
                    lastYVal = repositionDownstream(block)
                }
            })

            setBlocks(localBlocks)

            console.log(localBlocks)

            return setGraph(response.data)
        }
        fetchData();
    }, [])

    const handleClick = block => () => {
        setTargetIP(block.ip)
        setIP(block.ip);
    }
    const height = 120

    return (
        <svg viewBox="-10 10 1280 190" width={1280} height={blocks.length * height} style={{ marginTop: 100 }}>
            {blocks.map((block, index) => (<SVGBlock
                key={block[index]}
                block={block}
                key={block.ip}
                selected={block.ip === ip}
                onClick={handleClick(block)}
            />))}
        </svg>
    )
}

export default HomeScreen;