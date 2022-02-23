import React, { useEffect, useState } from 'react';
import * as getValue from '../api/data';
import { makeStyles } from '@mui/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableFooter, Typography } from '@mui/material';
import { getTargetIP } from '../api/API';
import * as getIP from '../api/data';
import { getGraph } from '../api/data';

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
        height: '100px',
        marginTop: '20px'
    },
    rect: {
        fill: "green"
    },
    clicked: {
        fill: "green",
        stroke: 'black'
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
    let ip = getTargetIP()

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
            const localIP = []
            const response = await getGraph()
            response.data.map(((element, i) => {
                localIP.unshift(element.upstream)
                if (localIP.indexOf(element.downstream) === -1) localIP.push(element.downstream)
            }));
            setGraph(localIP)
            return setBlocks(response.data)
        }
        fetchData()

    }, [])
    console.log('graph', graph)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(+event.target.value);
        setPage(0);
    };
    const x = 60;

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
            {blocks &&
                <Paper className={classes.minigraph}>
                    <svg viewBox="0 0 180 20" >
                        {graph.map(((item, index) => (
                            <svg viewBox="0 0 180 20" >
                                <rect width="10" height="10" x={15 + x * index} y={10} className={ip === item ? classes.clicked : classes.rect} />
                                <line x1={15 + x} y1="15" x2={x * index + 15} y2="15" stroke="black" />
                            </svg>

                        )))}
                    </svg>
                </Paper>
            }
        </>
    )
}

export default DataScreen;