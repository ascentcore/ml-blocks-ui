import React from 'react';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useStyles } from './Style.styles';

export function MUICheckbox({ property }) {
    const classes = useStyles();


    return (
        <div>
            <FormControlLabel
                fullWidth={true}
                control={<Checkbox checked={property.value || false} />} label={property.title} />
        </div>
    )
}