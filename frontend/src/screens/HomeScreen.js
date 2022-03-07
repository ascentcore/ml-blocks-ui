import React, { useEffect, useState } from 'react';
import { getTargetIP } from '../api/API';
import { getGraph, getNodes } from '../api/data';
import SVGBlock from '../components/SVGBlock';
import { useDispatch } from 'react-redux';
import { setIPReducer } from '../redux/ip-reducer';
import { getGraphReducer } from '../redux/graph-reducer';

const BLOCK_HEIGHT = 120

const HomeScreen = () => {


    // const [graph, setGraph] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const dispatch = useDispatch();
    const [ip, setIP] = useState(getTargetIP());
    let storedIP = getTargetIP()

    useEffect(() => {
        async function fetchData() {
            const { data: hosts } = await getNodes()
            const { data: edges } = await getGraph()

            const blocks = {}

            hosts.forEach((host, index) => {

                blocks[host.host] = {
                    ip: host.host,
                    location: [0, BLOCK_HEIGHT * index],
                    upstream: [],
                    downstream: []
                }
            });

            edges.forEach(({ upstream, downstream, edge_type }) => {
                const upstreamBlock = blocks[upstream]
                const downstreamBlock = blocks[downstream]
                if (upstreamBlock && downstreamBlock) {
                    downstreamBlock.upstream.push({ block: upstreamBlock, edgeType: edge_type })
                    upstreamBlock.downstream.push({ block: downstreamBlock, edgeType: edge_type })
                }
            })

            let currentY = 0

            //ANA Version
            // console.log(localBlocks)
            // return dispatch(getGraphReducer(response.data))

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

            console.log(blocks)

        }
        fetchData();
    }, [ip, storedIP])

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await getGraph()
    //         const blocks = {}

    //         const registerBlock = (ip) => {
    //             let block = blocks[ip]

    //             if (ip !== 'None' && !blocks[ip]) {
    //                 block = {
    //                     ip,
    //                     location: [0, 0],
    //                     upstream: [],
    //                     downstream: []
    //                 }

    //                 blocks[ip] = block

    //             }

    //             return block
    //         }




    //         setBlocks(Object.values(blocks))
    //     }
    //     fetchData();
    // }, [])

    const handleClick = block => () => {
        const ip = dispatch(setIPReducer(block.ip));
        setIP(ip.payload)
    }

    const height = 120

    return (
        <svg viewBox={`-10 -20 1280 ${blocks.length * height}`} width={1280} height={blocks.length * height} style={{ marginTop: 100 }}>
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
                selected={block.ip === storedIP}
                onClick={handleClick(block)}
            />))}
        </svg>
    )
}

export default HomeScreen;