import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { SchemaForm } from '@ascentcore/react-schema-form'
import schema from './basic-schema'

const PredictTab = () => {


  function onSubmit(data:any) {
    console.log(data)
  }

  const data = {
    firstName: 'Defined Value'
  }


  return(
    <>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <SchemaForm schema={schema} onSubmit={onSubmit} data={data} />
        </Grid>
        <Grid xs={6}>
          <Paper elevation={3} sx={{ height: 300, width: 300 }} />
        </Grid>
      </Grid>
    </>
  )
}
export default PredictTab
