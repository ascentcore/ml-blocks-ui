import { ListItemButton, ListItemIcon, ListItemText, List, Stack } from '@mui/material';
import { Link } from "react-router-dom";
import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StorageIcon from '@mui/icons-material/Storage';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        margin: '-30px 0 50px 0px',
        width: '70%',
    },
    button: {
        padding: 0,
    },
    text: {
        marginLeft: '-25px ',
    }
}))

function BlockMenu() {
    const classes = useStyles();
    return (
        <List component={Stack}
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
        >
            <ListItemButton component={Link} to="/status" className={classes.button}>
                <ListItemIcon>
                    <PlaylistAddCheckIcon />
                </ListItemIcon>
                <ListItemText primary="Status" className={classes.text} />
            </ListItemButton>
            <ListItemButton component={Link} to="/upload" className={classes.button}>
                <ListItemIcon>
                    <CloudUploadIcon />
                </ListItemIcon>
                <ListItemText primary="Upload" className={classes.text} />
            </ListItemButton>
            <ListItemButton component={Link} to="/data" className={classes.button}>
                <ListItemIcon>
                    <StorageIcon />
                </ListItemIcon>
                <ListItemText primary="Data" className={classes.text} />
            </ListItemButton>

            <ListItemButton component={Link} to="/predict" className={classes.button}>
                <ListItemIcon>
                    <PlayCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Predict" className={classes.text} />
            </ListItemButton>

            <ListItemButton button component={Link} to="/statics" className={classes.button}>
                <ListItemIcon>
                    <EqualizerIcon />
                </ListItemIcon>
                <ListItemText primary="Statics" className={classes.text} />
            </ListItemButton>

            <ListItemButton component={Link} to="/settings" className={classes.button}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" className={classes.text} />
            </ListItemButton>
        </List>
    )
};

export default BlockMenu;