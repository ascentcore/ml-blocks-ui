import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { getTargetIP } from '../api/API';
import { getStatusOfIp, pipelineRebuild } from '../api/data';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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
            setStatus(response.data.status)
            setFormat(response.data.export_formats[0])
            console.log('format', response.data.export_formats[0])
        }
        fetchData();
    }, [ip])

    const handleClick = async () => {
        try {
            const response = await pipelineRebuild()
            console.log('res', response)
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <>
            {status &&
                <Grid container alignItems="flex-start" className={classes.grid} direction="column">
                    <Grid item container className={classes.gridRow} >
                        <Typography style={{ marginLeft: '-530px' }}>Status:</Typography>
                        <Typography>{status?.state_name}</Typography>
                    </Grid>
                    <Grid item container className={classes.gridRow}>
                        <Typography style={{ marginLeft: '-470px' }}>Format:</Typography>
                        <Typography>{format}</Typography>
                    </Grid>
                    <Button variant="outlined" className={classes.button} onClick={handleClick}>Rebuild</Button>
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