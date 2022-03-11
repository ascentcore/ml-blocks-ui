import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from "react-router-dom";
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LayersIcon from '@material-ui/icons/Layers';
import { getTargetIP } from '../api/API';
import { getStatusOfIp } from '../api/data';

function AppMenu() {
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
        <>
            <ListItemButton component={Link} to="/">
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>

            <ListItemButton component={Link} to="/status" >
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary={`${status?.name}`} />
            </ListItemButton>

            <ListItemButton component={Link} to="/registry-settings">
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Registry Settings" />
            </ListItemButton>
        </>
    )
};

export default AppMenu;