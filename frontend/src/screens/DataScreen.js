import React, { useEffect, useState } from 'react';
import * as getValue from '../api/data';
import { makeStyles } from '@mui/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableFooter } from '@mui/material';

const useStyles = makeStyles(() => ({
    paper: {
        marginTop: '60px',
        width: '100%',
        overflow: 'hidden',

    },
    tableContainer: {
        backgroundColor: '#F3F6F4',
    },
    tableFooter: {
        '& tr > td': {
            border: 0
        }
    }
}))

const DataScreen = () => {

    const classes = useStyles();
    const [value, setValue] = useState();
    const [page, setPage] = useState(0);
    const [columns, setColumns] = useState([]);
    const [totalCount, settotalCount] = useState();
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        async function fetchData() {
            const response = await getValue.dataCount()
            return settotalCount(response.data)
        }
        fetchData();

    }, []);

    useEffect(() => {
        if (!totalCount) return
        async function fetchData() {
            const response = await getValue.getData(page, pageSize)
            return setValue(response)
        }
        fetchData();

    }, [totalCount, page]);

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
        <Paper className={classes.paper}>
            {totalCount && <TableContainer className={classes.tableContainer} sx={{ maxHeight: 440 }}>
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
                    <TableFooter className={classes.tableFooter}>
                        <TableRow align="right">
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 50]}
                                count={totalCount}
                                rowsPerPage={pageSize}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>}
        </Paper>
    )
}

export default DataScreen;