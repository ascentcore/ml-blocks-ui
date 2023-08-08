import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import usePredictHook from './PredictHook';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
interface ComputerVisionImageProps {
  uuid: string,
}
const ComputerVisionImage = ({uuid}: ComputerVisionImageProps) => {
  const {
    inputError,
    predictResponse,
    predictErrorResponse,
    loadingPredict,
    handleFormSubmit
  } = usePredictHook(uuid);


  return(
    <>
      <Grid container spacing={2}>
        <form onSubmit={handleFormSubmit} style={{width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem'}}>
          <TextField
            error={inputError}
            name={'modelInput'}
            sx={{width: '100%', background: '#fff'}}/>
          <Button variant="contained" size="large" type={'submit'}>
            Generate
          </Button>
        </form>
        {loadingPredict && <LinearProgress />}
        <p>{predictResponse}</p>
        {predictErrorResponse && <Alert severity="error" sx={{marginTop:'1rem'}}>{predictErrorResponse}</Alert>}
      </Grid>
    </>
  )
}
export default ComputerVisionImage;
