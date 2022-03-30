import React from "react";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useStyles } from "./Style.styles";

export function MUICheckbox({ property, value, onChange }) {
  const classes = useStyles();

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={(evt) => {
            onChange(evt.target.checked);
          }}
        />
      }
      label={property.title}
    />
  );
}
