import React, { useState } from 'react';
import { Button, Input, Typography } from '@mui/material';

export function MUIChooseFile({ value, property, onChange }) {

    const [file, setFile] = useState(null)

    const handleChange = evt => {
        setFile(evt.target.files[0].name)
        onChange(evt.target.files[0])
    }

    return (
        <label htmlFor="contained-button-file">
            <Typography sx={{ m: 1 }}>{property.title} {file}
                <Button sx={{ ml: 4 }} variant="contained" component="label">
                    <Input style={{ display: 'none' }} onChange={handleChange}
                        type="file"
                        hidden />
                    Upload
                </Button>
            </Typography>
        </label>
    )
}