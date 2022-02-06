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

    const [count, setCount] = useState();

    useEffect(() => {
        async function fetchData() {
            const response = await getValue.dataCount()
            console.log('count', response?.data[0])
            return setCount(response)
        }
        fetchData();

    }, []);

    console.log('c', count?.data[0])
    useEffect(() => {
        if (!count) return
        async function fetchData() {
            const response = await getValue.getData(page, count?.data[0])
            console.log('resp', response)
            return setValue(response)
        }
        fetchData();
    }, [count]);

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
                        <TableRow>
                            <TableCell >Sepal Lenght</TableCell>
                            <TableCell align="right">Sepal Weight</TableCell>
                            <TableCell align="right">Petal Length</TableCell>
                            <TableCell align="right">Petal Weight</TableCell>
                            <TableCell align="right">Variety</TableCell>
                        </TableRow>
                    </TableHead>
                    {value?.data?.length > 0 &&
                        <TableBody>
                            {value?.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow hover key={row[Object.keys(row)[index]]}>
                                    <TableCell  >{row[Object.keys(row)[0]]}</TableCell>
                                    <TableCell align="right">{row[Object.keys(row)[1]]}</TableCell>
                                    <TableCell align="right">{row[Object.keys(row)[2]]}</TableCell>
                                    <TableCell align="right">{row[Object.keys(row)[3]]}</TableCell>
                                    <TableCell align="right">{row[Object.keys(row)[4]]}</TableCell>
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