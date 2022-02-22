import React from 'react';
import { Grid, Button } from '@mui/material';

export function MUIChooseFile({ value, property, onChange }) {


    const handleChange = evt => {
        onChange(evt.target.files[0])
    }

    return (

        <Button
            variant="text"
s        >
            <input
                onChange={handleChange}
                type="file"
                accept={property.contentMediaType}
            />
        </Button>
    )
}