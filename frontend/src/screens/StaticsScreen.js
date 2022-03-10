import React, { useEffect, useState } from 'react';
import { getTargetIP } from '../api/API';
import * as getIP from '../api/data';
import { download } from '../api/data';
import { makeStyles } from '@mui/styles';
import { Grid, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom';
import { API_BASE } from '../api/API';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export const useStyles = makeStyles((theme) => ({
    list: {
        width: '300px',
        marginTop: '100px'
    },
    image: {
        maxWidth: '100%',
        height: 'auto'
    },
    search: {
        marginBottom: '30px',
        width: '300px',
    }
}))

const StaticsScreen = () => {
    const classes = useStyles();
    const [value, setValue] = useState();
    const [image, setImage] = useState('');
    const [filteredItems, setFilteredItems] = useState();

    let ip = getTargetIP()

    useEffect(() => {
        if (ip === undefined && path === '') return
        async function fetchData() {
            const response = await getIP.getProxy(ip, 'api/v1/statics/')
            setFilteredItems(response.data)
            return setValue(response.data)
        }

        fetchData();
    }, [ip]);

    const getIconForFile = item => {
        const re = /(?:\.([^.]+))?$/;
        const extension = re.exec(item)[1]
        switch (extension) {
            case 'png':
            case 'jpg':
            case 'jpeg':
                return <img className={classes.image} src={`/proxy/${ip}/api/v1/download/${item}`} />

            default:
                return <InsertDriveFileIcon />
        }
    }
    

    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = value.filter((image) => {
                return image.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            });
            setFilteredItems(results);
        } else {
            setFilteredItems(value);
        }

        setImage(keyword);
    };

    return (
        <>
            {value &&
                <>
                    <Grid container justifyContent="flex-start">
                        <TextField
                            variant="outlined"
                            placeholder='Search'
                            type="search"
                            value={image}
                            onChange={filter}
                            className={classes.search}
                        />
                    </Grid>
                    <Grid container justifyContent="center">
                        {filteredItems && filteredItems.length > 0 ?
                            (filteredItems.map((item => (
                                <Grid item xs={12} md={6} lg={4} key={item}>
                                    <div>{getIconForFile(item)}</div>
                                    <Link to={`/proxy/${ip}/api/v1/download/${item}`} target="_blank" ><DownloadIcon /> {item}</Link>
                                </Grid>
                            )))
                            ) : (
                                <Typography>No results found!</Typography>
                            )
                        }
                    </Grid>
                </>
            }
        </>
    )
}

export default StaticsScreen;