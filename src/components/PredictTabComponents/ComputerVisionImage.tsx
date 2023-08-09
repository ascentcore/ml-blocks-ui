import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import usePredictHook from './PredictHook';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Loading from '../ui/Loading';
interface ComputerVisionImageProps {
  uuid: string,
}
const ComputerVisionImage = ({uuid}: ComputerVisionImageProps) => {
  const {
    inputError,
    predictResponse,
    predictErrorResponse,
    loadingPredict,
    showPredictResponse,
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
        {predictErrorResponse && <Alert severity="error" sx={{marginTop:'1rem'}}>{predictErrorResponse}</Alert>}
        <Grid xs={12} sx={{marginTop:'2rem'}}>
          { showPredictResponse &&
          <Loading loading={loadingPredict}>
            <img src={'data:image/png;base64,' + predictResponse} alt="result" style={{'margin': '0 auto', 'display':'block'}} />
          </Loading>
          }
        </Grid>
      </Grid>
    </>
  )
}
export default ComputerVisionImage;
