import React from 'react';
import { Grid, Button } from '@mui/material';
import { useStyles } from './Style.styles';

export function MUIChooseFile({ value, property, onChange }) {
    const classes = useStyles();
    return (
        <Grid container className={classes.grid}>
            <Button onClick={onChange}>
                <input
                    type="file"
                    accept={property.contentMediaType}
                />
            </Button>
        </Grid>
    )
}