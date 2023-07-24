import Grid from '@mui/material/Unstable_Grid2';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import './StatusTab.scss'
import loadGraph from '../assets/images/load-graph.svg'
import Button from '@mui/material/Button';
const StatusTab = () => {
  return(
    <Grid container spacing={2}>
      <Grid xs={4}>
        <Card className='statusCard card'>
          <CardContent className='cardContent'>
            <p>Load</p>
            <p><big>983</big> requests/hr</p>
            <img src={loadGraph} />
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={4}>
        <Card className='avgResponseCard card'>
          <CardContent className='cardContent'>
            <p>Avg response time</p>
            <p><big>30</big> ms</p>
            <div className='cardFooter'>
              <p>Min: 5 ms</p>
              <p>Max: 123 ms</p>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={4}>
        <Card className='lastUpdateCard card'>
          <CardContent className='cardContent'>
            <p>Last update</p>
            <p><big>14 APR 2023</big></p>
            <div className='cardFooter'>
              <p>Previous: 12 Mar 2023</p>
              <Button className='listButton' size='small'>List</Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
export default StatusTab
