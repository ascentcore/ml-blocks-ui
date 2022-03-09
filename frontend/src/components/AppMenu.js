import { IconButton, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Link } from "react-router-dom";
import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StorageIcon from '@mui/icons-material/Storage';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LayersIcon from '@material-ui/icons/Layers';
import { getTargetIP } from '../api/API';
import { getStatusOfIp } from '../api/data';

function AppMenu({ setFalse, setTrue }) {
    const [status, setStatus] = React.useState();
    const ip = getTargetIP()
    React.useEffect(() => {
        async function fetchData() {
            const response = await getStatusOfIp(ip)
            return setStatus(response.data)
        }
        fetchData()
    }, [ip])

    return (
        <div>
            <div onClick={setFalse}>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
            </div>
            <div onClick={setTrue}>
                <ListItemButton component={Link} to="/status">
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${status?.name}`} />
                </ListItemButton>
            </div>
            <div onClick={setFalse}>
                <ListItemButton component={Link} to="/registry-settings">
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Registry Settings" />
                </ListItemButton>
            </div>
        </div>
    )
};

export default AppMenu;