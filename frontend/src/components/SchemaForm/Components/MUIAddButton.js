import React from 'react';
import { useStyles } from './Style.styles';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export function MUIAddButton({ property, onChange }) {
    const classes = useStyles();
    return (
        <div>
            <Button onClick={onChange} >
                <AddIcon />
            </Button>
        </div>
    )
}