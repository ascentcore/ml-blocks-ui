import React from 'react';
import { Grid, TextField } from '@mui/material';
import { useStyles } from './Style.styles';

export function MUITextField({ property, value, onChange }) {
    const classes = useStyles();

    const handleChange = (event) => {
        if (property.title == 'Phone number') {
            const re = /[0-9]+/g;
            if (event.target.value === '' || re.test(event.target.value)) {
                onChange(event.target.value)
            }
        } else {
            let { value } = event.target
            if (property.type === 'integer') {
                value = parseInt(value)
            } else if (property.type === 'number') {
                value = parseFloat(value)
            }
            onChange(value)
        }
    }

    const getHelperText = () => {
        let helperText = undefined
        if (property.error) {
            helperText = property.error[0].message
        } else {

            if (property.minimum) {
                helperText = (helperText || '') + ` min: ${property.minimum}`
            }

            if (property.maximum) {
                helperText = (helperText || '') + ` max: ${property.maximum}`
            }
        }

        return helperText
    }
    return (
        <TextField
            value={value || ''}
            onChange={handleChange}
            fullWidth={true}
           
            label={property.title}
            required={property.isRequired}
            error={!!property.error}
            helperText={getHelperText()}
        />
    )
}