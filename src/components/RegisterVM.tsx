import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Loading from './ui/Loading';
import {useState, ChangeEvent, FormEvent} from 'react';
import api from '../api/api';

const RegisterVM = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsFormSubmitting(true);
    setFormError('');

    if(inputValue === '') {
      setInputError(true);
      return
    }

    const IPArray =  inputValue.split(':')
    const ip = IPArray[0].trim();
    const port = parseInt(IPArray[1]?.trim()) || '';

    const dataObj:{ip: string, port?: number} = {
      ip: ip,
    }
    if(port !== ''){
      console.log('port if', port);
      dataObj.port = port
    }
    console.log('dataObj ', dataObj);

    api.registerVM(dataObj).then((result) => {
      console.log('result', result.data);
      setIsFormSubmitting(false);
    }).catch(e=>{
      console.log(e)
      setIsFormSubmitting(false);
      if(e.response.data.response) {
        setFormError(e.response.data.response);
      }
    });
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('change');
    setInputValue(event.target.value);
  };


  return(
    <>
      <Grid container spacing={2} sx={{'marginBottom': '2rem'}}>
        <form onSubmit={handleSubmit} style={{'width': '100%', 'display':'flex'}}>
          <Grid xs={10}>
            <TextField id="outlined-basic"
              error={inputError}
              value={inputValue} onChange={handleChange}
              label="Register VM" variant="outlined"  sx={{'width': '100%', 'backgroundColor': '#fff'}}/>
          </Grid>
          <Grid xs={2}>
            <Loading loading={isFormSubmitting}>
              <Button type='submit' variant="contained" sx={{'width': '100%', 'height': '100%'}}>LOOKUP</Button>
            </Loading>
          </Grid>
        </form>
        <Grid xs={12}>
          {formError !== '' && <Alert severity="error">{formError}</Alert>}
        </Grid>
      </Grid>
    </>
  )
}

export default RegisterVM
