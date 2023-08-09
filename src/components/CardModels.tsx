import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import api from '../api/api';

interface cardModelProps {
  name: string,
  uuid: string,
  blockUuid: string,
  version: number,
  status: string,
  description: string,
  onSelectModel: () => void,
}
const CardModels = ({name, uuid, version, status, description, blockUuid, onSelectModel}: cardModelProps) => {
  const displayStatus = (status: string) => {
    if(status === 'idle')
      return(
        <Chip variant='filled' color='default' size="small" label={status} />
      )
    if(status === 'READY')
      return(
        <Chip variant='filled' color='primary' size="small" label={status} />
      )
    if(status === 'ACTIVE')
      return(
        <Chip variant='filled' color='success' size="small" label={status} />
      )

    return(
      <Chip variant='filled' color='primary' size="small" label={status} />
    )
  }

  const selectModel = (uuid:string, modelName:string, version:number) => {
    api.selectInferenceModel(uuid, modelName, version).then((result )  => {
      onSelectModel();
    }).catch((e)=>{console.log(e);})
  }

  return (
    <Card className='cardWrapper cardModels'>
      <CardContent className='cardContent'>
        <div className='cardHeader'>
          <h2>{name}</h2>
          <div>{ displayStatus(status) }</div>
        </div>
        <p className='uuid'>{uuid}</p>
        <p className='ip'>v{version}</p>
        <p className='description'>{description}</p>
      </CardContent>
      <CardActions className='cardActions' sx={{padding:'1rem'}}>
        {(status !== 'ACTIVE') &&
          <Button size='small' color='primary' onClick={(event) => selectModel(blockUuid, name, version)}>Select model</Button> }
      </CardActions>
    </Card>
  )
}

export default CardModels
