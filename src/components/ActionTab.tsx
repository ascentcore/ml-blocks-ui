import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useState} from 'react';
const ActionTab = () => {
  const [deployBlock, setDeployBlock] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setDeployBlock(event.target.value as string);
  };

  return (
    <div>
      <Button variant="contained" size="large" sx={{'marginTop': '1rem', 'display':'block', 'minWidth': '200px'}}>
        Train
      </Button>
      <FormControl sx={{'minWidth': '200px', 'marginTop': '1rem'}}>
        <InputLabel id="demo-simple-select-label">Deploy Block</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={deployBlock}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={1}>Block 1</MenuItem>
          <MenuItem value={2}>Block 1</MenuItem>
          <MenuItem value={3}>Block 3</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" size="large" sx={{'marginTop': '1rem','display':'block', 'minWidth': '200px'}}>
        Publish
      </Button>
    </div>
  );
}

export default ActionTab;
