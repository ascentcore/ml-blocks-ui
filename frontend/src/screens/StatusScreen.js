import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { getTargetIP } from '../api/API';
import { getStatusOfIp } from '../api/data';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableFooter } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
    grid: {
        marginTop: '100px'
    },
    tableContainer: {
        width: '500px',
        marginTop: '30px',
        border: 'thin solid grey'
    },
    button: {
        width: '100px',
        margin: '-50px 0 0 400px'
    },
    gridRow: {
        justifyContent: "center",
        direction: "row",
        marginLeft: '-250px'
    }
}))

const StatusScreen = () => {
    const classes = useStyles();
    const [status, setStatus] = useState()
    const [format, setFormat] = useState();
    let ip = getTargetIP();

    useEffect(() => {
        if (!ip) return
        async function fetchData() {
            const response = await getStatusOfIp(ip)
            setStatus(response.data.status[0])
            setFormat(response.data.export_formats[0])
            console.log('format', response.data.export_formats[0])
        }
        fetchData();
    }, [ip])
    console.log('status', status)

    return (
        <>
            {status &&
                <Grid container alignItems="center" className={classes.grid} direction="column">
                    <Grid item container className={classes.gridRow} >
                        <Typography style={{ marginLeft: '-130px' }}>Status:</Typography>
                        <Typography>{status?.state_name}</Typography>
                    </Grid>
                    <Grid item container className={classes.gridRow}>
                        <Typography style={{ marginLeft: '-70px' }}>Format:</Typography>
                        <Typography>{format}</Typography>
                    </Grid>
                    <Button variant="outlined" className={classes.button}>Rebuild</Button>
                    <TableContainer className={classes.tableContainer} md={{ maxHeight: 640 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">State name</TableCell>
                                    <TableCell align="center">Time</TableCell>
                                </TableRow>

                            </TableHead>
                            <TableBody>
                                <TableRow hover>
                                    <TableCell align="center">{status?.state_name}</TableCell>
                                    <TableCell align="center">{status?.time}</TableCell>

                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            }
        </>
    )
}

export default StatusScreen;