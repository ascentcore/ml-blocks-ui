import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { getTargetIP } from '../api/API';
import { getStatusOfIp, pipelineRebuild, train } from '../api/data';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
    tableContainer: {
        width: '500px',
        marginTop: '30px',
        border: 'thin solid grey'
    }

}))

const StatusScreen = () => {
    const classes = useStyles();
    const [data, setData] = useState()
    const [status, setStatus] = useState()
    const [format, setFormat] = useState();
    let ip = getTargetIP();

    useEffect(() => {
        console.log('Fetching for', ip)
        if (!ip) return
        async function fetchData() {
            const response = await getStatusOfIp(ip)
            setData(response.data || {})
            setStatus(response.data.status || [])
            setFormat(response.data.export_formats[0])
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

    const handleRetrain = () => {
        train(ip)
    }

    const hasOperation = operation => data && data.operations && data.operations.indexOf(operation) !== -1

    return (
        <>
            {status &&
                <Grid container className={classes.grid} direction="column">
                    <Grid item container className={classes.gridRow} >
                        <Typography >Status:</Typography>
                        <Typography>{status?.state_name}</Typography>
                    </Grid>
                    <Grid item container className={classes.gridRow}>
                        <Typography>Format:</Typography>
                        <Typography>{format}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {hasOperation('train') && <Button variant="outlined" onClick={handleRetrain}>Train</Button>}
                        <Button variant="outlined" onClick={handleClick}>Rebuild</Button>
                    </Grid>
                    
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