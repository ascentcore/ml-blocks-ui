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
            const blocks = {}

            const registerBlock = (ip) => {
                let block = blocks[ip]

                if (ip !== 'None' && !blocks[ip]) {
                    block = {
                        ip,
                        location: [0, 0],
                        upstream: [],
                        downstream: []
                    }

                    blocks[ip] = block

                }

                return block
            }

            response.data.forEach(({ upstream, downstream, edge_type }) => {
                const upstreamBlock = registerBlock(upstream)
                const downstreamBlock = registerBlock(downstream)
                if (upstreamBlock && downstreamBlock) {
                    downstreamBlock.upstream.push({ block: upstreamBlock, edgeType: edge_type })
                    upstreamBlock.downstream.push({ block: downstreamBlock, edgeType: edge_type })
                }
            })

            let currentY = 0

            const roots = Object.values(blocks).filter(item => item.upstream.length === 0)
            const positionBlock = (x, block, currentY) => {
                let startFromY = currentY
                if (!block.visited) {
                    block.location = [x, startFromY]
                    block.downstream.forEach(downstreamBlock => {
                        positionBlock(x + 300, downstreamBlock.block, startFromY)
                        startFromY += 120
                    })
                    block.visited = true
                }
                return startFromY
            }

            roots.forEach(root => {
                currentY = positionBlock(0, root, currentY)
            })


            setBlocks(Object.values(blocks))
        }
        fetchData();
    }, [])

    const handleClick = block => () => {
        setTargetIP(block.ip)
        setIP(block.ip);
        window.location.reload();
    }
    const height = 120

    return (
        <svg viewBox="-10 10 1280 190" width={1280} height={blocks.length * height} style={{ marginTop: 100 }}>
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
            {blocks.map((block, index) => (<SVGBlock
                key={block.ip}
                block={block}
                selected={block.ip === ip}
                onClick={handleClick(block)}
            />))}
        </svg>
    )
}

export default HomeScreen;