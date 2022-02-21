import React, { useState } from 'react';
import { Grid, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import { useStyles } from './Style.styles';

export function MUISelectElement({ property, value, onChange }) {
    const classes = useStyles();


    const handleChange = (event) => {
        onChange(event.target.value);
    };
    return (
        <TextField
            select
            label={property.title}
            value={value}
            onChange={handleChange}
        >

            {property.enum.map((item) => {
                return (
                    <MenuItem key={item} value={item}>
                        {item}
                    </MenuItem>
                )
            })}
        </TextField>
    )
}