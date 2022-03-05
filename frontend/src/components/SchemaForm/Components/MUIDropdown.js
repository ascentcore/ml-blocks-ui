import React from 'react';
import { MenuItem, TextField } from '@mui/material';

export function MUISelectElement({ property, value, onChange }) {



    const handleChange = (event) => {
        onChange(event.target.value);
    };

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
            select
            fullWidth={true}
            label={property.title}
            value={value}
            defaultValue=""
            onChange={handleChange}
            error={!!property.error}
            helperText={getHelperText()}
        >

            {(property.enum || property.options).map((item) => {
                if (property.labelKey && property.valueKey) {
                    return (
                        <MenuItem key={item[property.valueKey]} value={item[property.valueKey]}>
                            {item[property.labelKey]}
                        </MenuItem>
                    )
                } else {
                    return (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    )
                }
            })}
        </TextField>
    )
}