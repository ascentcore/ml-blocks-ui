import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import usePredictHook from './PredictHook';
import LinearProgress from '@mui/material/LinearProgress';
interface ComputerVisionImageProps {
  uuid: string,
}
const ComputerVisionImage = ({uuid}: ComputerVisionImageProps) => {
  const {
    inputError,
    predictResponse,
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
      </Grid>
    </>
  )
}
export default ComputerVisionImage;
