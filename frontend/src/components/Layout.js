import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import { getTargetIP } from '../api/API';
import { getGraph } from '../api/data';
import SVGMinimap from '../components/SVGMinimap';
import { useDispatch } from 'react-redux';
import { setIPReducer } from '../redux/ip-reducer';
import { getGraphReducer } from '../redux/graph-reducer';

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

const Layout = ({ children }) => {

    const [show, setShow] = useState(false);
    const classes = useStyles({ show });
    const [blocks, setBlocks] = useState([]);
    const dispatch = useDispatch();
    const [ip, setIP] = useState(getTargetIP());
    let storedIP = getTargetIP()

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
                    block.location = [cx + 55, cy + 50 * index]
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

            return dispatch(getGraphReducer(response.data))
        }
        fetchData();

    }, [ip, storedIP])


    const handleClick = block => () => {
        const ip = dispatch(setIPReducer(block.ip));
        setIP(ip.payload);

    }

    const handleShow = () => setShow(!show)

    const height = 50


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
                                <svg viewBox="-10 70 390 90" width={380} height={blocks.length * height} style={{ marginTop: 20 }}>
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