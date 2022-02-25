import React, { useEffect, useState } from 'react';
import * as getValue from '../api/data';
import { makeStyles } from '@mui/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Grid, Typography } from '@mui/material';
import { getTargetIP, setTargetIP } from '../api/API';
import * as getIP from '../api/data';
import { getGraph } from '../api/data';
import SVGMinimap from '../components/SVGMinimap';

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
        width: '300px',
        height: '150px',
        background: '#fff',
        boxShadow: '0 -1px 3px black',
        position: 'relative',
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
        boxShadow: '0 -3px 3px black ',
        display: 'inline-block',
        position: 'relative',
        float: 'right',
        borderBottom: '5px solid #fff',
        marginBottom: '-3px',
        paddingBottom: '20px',

    },
    downArrow: {
        margin: '1px 18px',
        width: '20px',
        height: '20px',
        border: 'solid black',
        borderWidth: '0 3px 3px 0',
        display: 'inline-block',
        padding: '3px',
        transform: 'rotate(45deg)',
    }
}))

const DataScreen = () => {

    const classes = useStyles();
    const [value, setValue] = useState();
    const [page, setPage] = useState(0);
    const [columns, setColumns] = useState([]);
    const [totalCount, settotalCount] = useState();
    const [pageSize, setPageSize] = useState(10);
    const [graph, setGraph] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [ip, setIP] = useState(getTargetIP());

    useEffect(() => {
        async function fetchData() {
            const response = await getValue.dataCount()
            return settotalCount(response.data)
        }
        fetchData();

    }, []);

    useEffect(() => {
        if (!totalCount && ip === undefined && path === '') return
        async function fetchData() {
            const response = await getIP.getProxy(ip, `api/v1/data?page=${page}&count=${totalCount}`)
            return setValue(response)
        }
        fetchData();

    }, [totalCount, page, ip]);

    useEffect(() => {
        if (!value) return
        setColumns(Object.keys(value?.data[0]))
    }, [value])

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

            return setGraph(response.data)
        }
        fetchData()

    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(+event.target.value);
        setPage(0);
    };

    const handleClick = block => () => {
        setTargetIP(block.ip)
        setIP(block.ip);
        window.location.href = window.location.href;
    }

    const height = 50

    return (
        <>
            <Paper sx={{ p: 2 }}>
                {totalCount && <TableContainer className={classes.tableContainer} md={{ maxHeight: 640 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            {columns?.length > 0 &&
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell>{column}</TableCell>
                                    ))}
                                </TableRow>
                            }
                        </TableHead>
                        {value?.data?.length > 0 &&
                            <TableBody>
                                {value.data.map((row, index) => (
                                    <TableRow hover>
                                        {Object.keys(row).map((item) => (
                                            <TableCell >{row[item]}</TableCell>
                                        ))}
                                    </TableRow>))
                                }
                            </TableBody>
                        }
                    </Table>
                </TableContainer>}
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 50]}
                    count={totalCount}
                    rowsPerPage={pageSize}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Grid container direction="column" alignContent="flex-end" justifyContent="flex-end" style={{ marginTop: '20px' }}>
                <div className={classes.paper} ><i className={classes.downArrow}></i></div>
                {blocks &&
                    <div className={classes.minigraph}>
                        <Typography className={classes.typography}>Graph Minimap</Typography>
                        <svg viewBox="-10 70 390 90" width={380} height={blocks.length * height} style={{ marginTop: 20 }}>
                            {blocks.map(((block, index) => (
                                <SVGMinimap
                                    key={block.ip}
                                    block={block}
                                    selected={block.ip === ip}
                                    onClick={handleClick(block)}
                                />)
                            ))}
                        </svg>
                    </div>
                }
            </Grid>
        </>
    )
}

export default DataScreen;