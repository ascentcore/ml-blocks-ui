import {ChangeEvent, ReactNode, ReactElement,} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { SchemaForm} from '@ascentcore/react-schema-form';
import schema from './basic-schema';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
interface RegistryKeys {
  [key: string]: {
    component?: ReactNode | string | any;
    wrapper?: ReactNode | any;
  };
}

const PredictTab = () => {
  function onSubmit(data: any) {
    console.log(data);
  }

  const data = {
    firstName: 'Defined Value',
  };

  function CustomWrapper({children}: {children: ReactNode}): ReactNode { // Update the return type
    return <div className='column col-12'><>{children}</></div>;
  }


  function CustomTextField({property, value, onChange}:
                             {property:any, value:string, onChange: (event: ChangeEvent<HTMLInputElement>) => void} )
    : ReactNode{
    const handleChange = (event:any) => {
      onChange(event.target.value)
    }
    return (
        <TextField
          value={value || ''}
          onChange={handleChange}
          error={!!property.error}
          label={property.title}
          helperText={property.error ? property.error[0].keyword : ' '}
          required={property.isRequired}
        />
    )
  }


  const customRegistry:RegistryKeys = {
    string: {component: CustomTextField, wrapper: CustomWrapper},
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={6}>
          {/*<SchemaForm schema={schema} onSubmit={onSubmit} data={data} config={{registry: customRegistry}} />*/}
          <form>
            <TextField
              id="outlined-multiline-static"
              label='JSON Input'
              multiline
              rows={12}
              defaultValue=""
              sx={{'backgroundColor': 'white', 'width': '100%'}}
            />
            <Button variant="contained" size="large" sx={{'marginTop': '1rem'}}>
              Submit
            </Button>
          </form>
        </Grid>
        <Grid xs={6}>
          <Paper elevation={3} sx={{minHeight:'250px', width: '100%' }}>
            <p>output</p>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default PredictTab;
