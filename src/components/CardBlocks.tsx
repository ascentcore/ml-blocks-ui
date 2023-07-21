import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import './CardBlocks.scss'
import {CardBlocksProps} from './CardBlock.interface';



const CardBlocks = ({id, name, description,status, ip, port, progress}: CardBlocksProps) => {
  const displayStatus = (status: string) => {
    console.log('status', status)
    if(status === 'idle')
      return(
        <Chip variant='filled' color='default' size="small" label={status} />
      )
    if(status === 'training')
      return(
        <Chip variant='filled' color='primary' size="small" label={status} />
      )
    if(status === 'predicting')
      return(
        <Chip variant='filled' color='primary' size="small" label={status} />
      )

    return(
      <Chip variant='filled' color='primary' size="small" label={status} />
    )
  }
  return(
    <Card className='cardWrapper'>
      <CardContent className='cardContent'>
        <div className='cardHeader'>
          <h2>{name}</h2>
          <div>{ displayStatus(status) }</div>
        </div>
        <p className='ip'>{ip}:{port}</p>
        <p className='description'>{description}</p>
        { (progress) ? <LinearProgress /> : '' }
      </CardContent>
      <CardActions className='cardActions'>
        { (progress) ? <Button size='small' color='error'>Stop</Button> : <div></div> }
        <Link to={`/block/${id}`}><Button size='small'>Details</Button></Link>
      </CardActions>
    </Card>
    )
}

export default CardBlocks
