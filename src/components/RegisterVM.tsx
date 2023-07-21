import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const RegisterVM = () => {
  return(
    <>
      <Grid container spacing={2} sx={{'marginBottom': '2rem'}}>
        <Grid xs={10}>
          <TextField id="outlined-basic" label="Register VM" variant="outlined"  sx={{'width': '100%', 'backgroundColor': '#fff'}}/>
        </Grid>
        <Grid xs={2}>
          <Button variant="contained" sx={{'width': '100%', 'height': '100%'}}>LOOKUP</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default RegisterVM
