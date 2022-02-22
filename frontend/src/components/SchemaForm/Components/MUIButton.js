import React from 'react';
import { Button } from '@mui/material';

export function MUIButton({ property, onChange, value, className }) {
    return (
        <Button variant="contained" onClick={onChange} className={className}>{value}</Button>
    )
}