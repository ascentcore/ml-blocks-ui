import Button from '@mui/material/Button';

const ActionTab = () => {
  return (
    <div>
      <Button variant="contained" size="large" sx={{'marginTop': '1rem', 'display':'block', 'minWidth': '200px'}}>
        Train
      </Button>
      <Button variant="contained" size="large" sx={{'marginTop': '1rem','display':'block', 'minWidth': '200px'}}>
        Publish
      </Button>
    </div>
  );
}

export default ActionTab;
