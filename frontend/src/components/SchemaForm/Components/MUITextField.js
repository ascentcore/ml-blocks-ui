import React from "react";
import { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import { useStyles } from "./Style.styles";

function isNumeric(value) {
  return !isNaN(parseInt(value)) || !isNaN(parseFloat(value));
}

export function MUITextField({ property, value, onChange }) {
  const [val, setVal] = useState(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  const handleValChange = (evt) => {
    const localVal = event.target.value;

    setVal(localVal);
    let updateVal;
    if (property.type === "integer") {
      updateVal = parseInt(localVal);
    } else if (property.type === "number") {
      updateVal = parseFloat(localVal);
    }
    if (isNumeric(updateVal)) {
      onChange(updateVal);
    }
  };

  const getHelperText = () => {
    let helperText = undefined;
    if (property.error) {
      helperText = property.error[0].message;
    } else {
      if (property.minimum) {
        helperText = (helperText || "") + ` min: ${property.minimum}`;
      }

      if (property.maximum) {
        helperText = (helperText || "") + ` max: ${property.maximum}`;
      }
    }

    return helperText;
  };
  return (
    <TextField
      value={val !== undefined ? val : ""}
      onChange={handleValChange}
      fullWidth={true}
      label={property.title}
      required={property.isRequired}
      error={!!property.error}
      helperText={getHelperText()}
    />
  );
}
