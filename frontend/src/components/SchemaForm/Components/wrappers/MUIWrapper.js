import React from 'react';
import { Box, Grid } from '@mui/material';

const MUIWrapper = ({ children, property }) => {
    return (
        <Grid item xs={12} sx={{ p: 1 }}>
            {children}
        </Grid>
    );
}

export default MUIWrapper;