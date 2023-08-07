import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



export default function MenuDrawer() {


  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <a href={'/'} style={{'textDecoration': 'none', 'color': 'white'}}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ML Blocks
            </Typography>
            </a>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
