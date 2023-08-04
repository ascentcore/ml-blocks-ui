import {ChangeEvent, useState} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import api from '../api/api';
interface PredictTabProps {
  uuid: string
}
const PredictTab = ({uuid}:PredictTabProps) => {

  const [inputError, setInputError] = useState<boolean>(false);
  const [predictResponse, setPredictResponse] = useState<string>('');
  const [loadingPredict, setLoadingPredict] = useState<boolean>(false);

  const handleFormSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputError(false);
    setPredictResponse('');
    const { jsonInput } = event.target;

    if(jsonInput.value === '') {
      setInputError(true);
      return
    }
    setLoadingPredict(true);
    postPredict(uuid, jsonInput.value);
  }

  const postPredict = (uuid:string, jsonInput:string) => {
    api.postPredict(uuid, jsonInput).then((result )  => {
      setLoadingPredict(false);
    }).catch((e)=>{
      setPredictResponse(e.response.data.response)
      setLoadingPredict(false);
      console.log(e.response.data.response);
    })
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={6}>
          {/*<SchemaForm schema={schema} onSubmit={onSubmit} data={data} config={{registry: customRegistry}} />*/}
          <form onSubmit={handleFormSubmit}>
            <TextField
              id="outlined-multiline-static"
              error={inputError}
              label='JSON Input'
              name='jsonInput'
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
  );
};

export default PredictTab;
