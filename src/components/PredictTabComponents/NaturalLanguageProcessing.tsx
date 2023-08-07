import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import usePredictHook from './PredictHook';

interface NaturalLanguageProcessingProps {
  uuid: string,
}

const NaturalLanguageProcessing =({uuid}: NaturalLanguageProcessingProps) => {
  const {
    inputError,
    predictResponse,
    loadingPredict,
    handleFormSubmit
  } = usePredictHook(uuid);

  return(
    <>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <form onSubmit={handleFormSubmit}>
            <TextField
              id="outlined-multiline-static"
              error={inputError}
              name='modelInput'
              multiline
              rows={12}
              sx={{'backgroundColor': 'white', 'width': '100%'}}
            />
            <Button variant="contained" size="large" type={'submit'} sx={{'marginTop': '1rem'}}>
              Submit
            </Button>
          </form>
        </Grid>
        <Grid xs={6}>
          <Paper elevation={3} sx={{minHeight:'307px', width: '100%' }}>
            {loadingPredict && <LinearProgress />}
            <p>{predictResponse}</p>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default NaturalLanguageProcessing;
