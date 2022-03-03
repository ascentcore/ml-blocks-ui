import React, { useEffect, useState } from 'react';
import { getTargetIP, setTargetIP } from '../api/API';
import { getGraph } from '../api/data';
import SVGBlock from '../components/SVGBlock';
import { useDispatch, useSelector } from 'react-redux';
import { setIPReducer } from '../redux/ip-reducer';

const HomeScreen = () => {

    const [graph, setGraph] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const dispatch = useDispatch();
    const [ip, setIP] = useState(getTargetIP());
    console.log('storeIP', ip)
    console.log('IP_', ip)

    useEffect(() => {
        async function fetchData() {
            const response = await getGraph()
            const localBlocks = []
            const blocks = {}
            console.log('response', response)
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
        const ip = dispatch(setIPReducer(block.ip));
        setIP(ip.payload)
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