import Grid from '@mui/system/Unstable_Grid';
import CardElement from '../components/ui/Card';
const Home = () => {
  return(
    <>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <CardElement>
              Card 1
            </CardElement>
          </Grid>
          <Grid xs={4}>
            <CardElement>
              Card 3
            </CardElement>
          </Grid>
          <Grid xs={4}>
            <CardElement>
              Card 2
            </CardElement>
          </Grid>
        </Grid>
    </>
  )
}

export default Home
