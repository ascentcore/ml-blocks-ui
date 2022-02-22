import React from 'react';
import { Grid } from '@mui/material';

const MUIFullWrapper = ({ children, property }) => {
    return (
        <Grid item xs={12} sx={{ p: 1 }}>
            {children}
        </Grid>
    );
}

export default MUIFullWrapper;