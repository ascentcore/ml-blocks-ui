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
    const [count, setCount] = useState();

    useEffect(() => {
        async function fetchData() {
            const response = await getValue.dataCount()
            return setCount(response)
        }
        fetchData();

    }, []);

    useEffect(() => {
        if (!count) return
        async function fetchData() {
            const response = await getValue.getData(page, count?.data[0])
            return setValue(response)
        }
        fetchData();

    }, [count]);

    useEffect(() => {
        if (!value) return
        setColumns(Object.keys(value?.data[0]))
    }, [value])

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.paper}>
            <TableContainer className={classes.tableContainer}>
                <Table  >
                    <TableHead>
                        {columns?.length > 0 &&
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column}>{column}</TableCell>
                                ))}
                            </TableRow>
                        }
                    </TableHead>
                    {value?.data?.length > 0 &&
                        <TableBody>
                            {value?.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow hover key={row[Object.keys(row)[index]]}>
                                    {Object.keys(row).map((item) => (
                                        <TableCell >{row[item]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    }
                    <TableFooter className={classes.tableFooter}>
                        {count?.data?.length > 0 &&
                            <TableRow align="right">
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 50]}
                                    count={count?.data[0]}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        }
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default DataScreen;