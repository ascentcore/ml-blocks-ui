import { ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Link } from "react-router-dom";
import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StorageIcon from '@mui/icons-material/Storage';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
function AppMenu() {
    return (
        <>
            <ListItemButton button component={Link} to="/">
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton button component={Link} to="/upload">
                <ListItemIcon>
                    <CloudUploadIcon />
                </ListItemIcon>
                <ListItemText primary="Upload" />
            </ListItemButton>
            <ListItemButton button component={Link} to="/data">
                <ListItemIcon>
                    <StorageIcon />
                </ListItemIcon>
                <ListItemText primary="Data" />
            </ListItemButton>

            <ListItemButton button component={Link} to="/status">
                <ListItemIcon>
                    <PlaylistAddCheckIcon />
                </ListItemIcon>
                <ListItemText primary="Status" />
            </ListItemButton>

            <ListItemButton button component={Link} to="/predict">
                <ListItemIcon>
                    <PlayCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Predict" />
            </ListItemButton>
        </>
    )
};

export default AppMenu;