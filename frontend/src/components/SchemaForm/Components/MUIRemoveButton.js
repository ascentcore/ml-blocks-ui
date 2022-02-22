import React from 'react';
import { Button, Grid } from '@mui/material';
import { useStyles } from './Style.styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export function MUIRemoveButton({ property, onChange }) {
    const classes = useStyles();
    return (
        <Button onClick={onChange} >
            <DeleteForeverIcon />
        </Button>
    )
}