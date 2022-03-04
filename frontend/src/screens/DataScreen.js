import React, { useEffect, useState } from 'react';
import * as getValue from '../api/data';
import { makeStyles } from '@mui/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import * as getIP from '../api/data';
import { getTargetIP, setTargetIP } from '../api/API';

const useStyles = makeStyles(() => ({
    tableContainer: {
        backgroundColor: '#F3F6F4',
    },
    tableFooter: {
        '& tr > td': {
            border: 0
        }
    },
}))

const DataScreen = () => {
    const classes = useStyles();
    const [value, setValue] = useState();
    const [page, setPage] = useState(0);
    const [columns, setColumns] = useState([]);
    const [totalCount, settotalCount] = useState(10);
    const [pageSize, setPageSize] = useState(10);
    const [ip, setIP] = useState(getTargetIP());

    useEffect(() => {
        async function fetchData() {
            const response = await getValue.dataCount(ip)
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(+event.target.value);
        setPage(0);
    };

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

        </>
    )
}

export default DataScreen;