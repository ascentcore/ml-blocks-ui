import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import { getTargetIP } from '../api/API';
import { getGraph, getNodes } from '../api/data';
import SVGMinimap from '../components/SVGMinimap';
import { useDispatch, useSelector } from 'react-redux';
import { setIPReducer } from '../redux/ip-reducer';
import { getGraphReducer, showGraphReducer } from '../redux/graph-reducer';

const useStyles = makeStyles(() => ({
    tableContainer: {
        backgroundColor: '#F3F6F4',
    },
    tableFooter: {
        '& tr > td': {
            border: 0
        }
    },
    minigraph: {
        width: '230px',
        height: '150px',
        background: '#fff',
        boxShadow: '0 -3px 5px rgba(0, 0, 0, 0.2), 0 -3px 5px rgba(0, 0, 0, 0.19)',
        position: 'fixed',
        bottom: 10,
        right: 50
    },
    typography: {
        margin: '10px 0 0 20px'
    },
    paper: {
        width: '60px',
        height: '40px',
        marginLeft: '240px',
        background: '#fff',
        zIndex: 1,
        boxShadow: (props) => props.show ? '0 -5px 5px rgba(0, 0, 0, 0.2) ' : '0 -5px 5px rgba(0, 0, 0, 0.2), 0 0 7px rgba(0, 0, 0, 0.19) ',
        display: 'inline-block',
        position: 'fixed',
        bottom: (props) => props.show ? 160 : 20,
        right: 50,
        borderBottom: '5px solid #fff',
        marginBottom: '-3px',
        paddingBottom: '20px',

    },
    downArrow: {
        alignItems: 'center',
        margin: '5px 19px',
        width: '20px',
        height: '20px',
        border: 'solid black',
        borderWidth: '0 3px 3px 0',
        display: 'inline-block',
        padding: '3px',
        transform: 'rotate(45deg)',
    }
}))

const BLOCK_HEIGHT = 30

const Layout = ({ children }) => {

    let showMiniGraph = useSelector(state => state.minigraph.showSlice.value)
    const [show, setShow] = useState(showMiniGraph);
    const classes = useStyles({ show });
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

            const roots = Object.values(blocks).filter(item => item.upstream.length === 0)
            const positionBlock = (x, block, currentY) => {
                let startFromY = currentY
                if (!block.visited) {
                    block.location = [x, startFromY]
                    block.downstream.forEach(downstreamBlock => {
                        positionBlock(x + 45, downstreamBlock.block, startFromY)
                        startFromY += 30
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
            return dispatch(getGraphReducer(edges))
        }
        fetchData();
    }, [ip, storedIP])


    const handleClick = block => () => {
        const ip = dispatch(setIPReducer(block.ip))
        setIP(ip.payload);
    }

    const handleShow = () => {
        const isShown = dispatch(showGraphReducer(!showMiniGraph))
        setShow(isShown.payload)
        if (isShown.payload) {
            window.location.reload();
        }
    }


    const height = 100


    return (
        <>
            <Grid container justifyContent="center" direction="column" >
                {children}
            </Grid>
            <Grid container direction="column" alignContent="flex-end" justifyContent="flex-end" style={{ marginTop: '20px' }}>
                <div className={classes.paper} onClick={handleShow} ><i className={classes.downArrow}></i></div>
                {show ?
                    <>
                        {blocks &&
                            <div className={classes.minigraph}>
                                <Typography className={classes.typography}>Graph Minimap</Typography>
                                <svg viewBox="-20 105 380 100" width={380} height={blocks.length * height} style={{ marginTop: 20 }}>
                                    {blocks.map(((block, index) => (
                                        <SVGMinimap
                                            key={block.ip}
                                            block={block}
                                            selected={block.ip === storedIP}
                                            onClick={handleClick(block)}
                                        />)
                                    ))}
                                </svg>
                            </div>
                        }
                    </>
                    : <></>}
            </Grid>
        </>
    );
}

export default Layout;