import React from 'react';
import { Box, Grid } from '@mui/material';
import { useStyles } from './Style.styles';

const MUIWrapper = ({ children, property }) => {
    const classes = useStyles();
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            {children}
        </Box>
    );
}

export default MUIWrapper;