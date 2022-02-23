import React, { useEffect, useState } from 'react';
import { getTargetIP } from '../api/API';
import * as getIP from '../api/data';
import { download } from '../api/data';
import { makeStyles } from '@mui/styles';
import { Grid, List, ListItem, ListItemText } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom';
import { API_BASE } from '../api/API';

export const useStyles = makeStyles((theme) => ({
    list: {
        width: '300px',
        marginTop: '100px'
    }
}))

const StaticsScreen = () => {
    const classes = useStyles();
    const [value, setValue] = useState();
    let ip = getTargetIP()

    useEffect(() => {
        if (ip === undefined && path === '') return
        async function fetchData() {
            const response = await getIP.getProxy(ip, 'api/v1/statics/')
            return setValue(response.data)
        }
        fetchData();

    }, [ip]);

    return (
        <>
            {value &&
                <Grid container justifyContent="center">
                    <List className={classes.list}>
                        {value.map((item => (
                            <ListItem key={item}>
                                <ListItemText primary={item} />
                                <Link to={`${API_BASE}/download/${item}`} target="_blank" download><DownloadIcon /></Link>
                            </ListItem>
                        )))}
                    </List>
                </Grid>
            }
        </>
    )
}

export default StaticsScreen;