import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {ChangeEvent, useState} from 'react';
import api from '../api/api';
import Loading from './ui/Loading';
interface ActionTabProps {
  uuid: string
}
const ActionTab = ({uuid}:ActionTabProps) => {

  const [deployBlock, setDeployBlock] = useState('');
  const [isLoadingTrain, setIsLoadingTrain] = useState(false);
  const [trainResponse, setTrainResponse] = useState({result: ''});
  const [inferBlocks, setInterBlocks] = useState(['']);
  const [showDeployOptions, setDeployOptions] = useState(false);
  let interval: NodeJS.Timer | null = null;

  const handleChange = (event: SelectChangeEvent) => {
    setDeployBlock(event.target.value as string);
  };

  const startTrain = (uuid:string) => {
    setIsLoadingTrain(true);
    setTrainResponse({result: ''});
    api.postTrainStart(uuid).then((result )  => {
      setIsLoadingTrain(false);
      setTrainResponse(JSON.parse(result.data.response));
      setDeployOptions(true);
      interval = setInterval(() => getTrainStatus(uuid), 100);
    }).catch((e)=>{
      setIsLoadingTrain(false);
      console.log(e)
    });
  }

  const getInferBlocks = () => {
    api.getBlocks().then((result) => {
      const resultList = JSON.parse(result.data.response);
      const inferBlocks = resultList.filter((block: any) => block.type === 'inference');
      setInterBlocks(inferBlocks);
    }).catch(e=>{
      console.log(e)
    });
  }

  const getTrainStatus = (uuid:string) => {
  api.getTrainStatus(uuid).then((result) => {
    const resultList = JSON.parse(result.data.response);
    if(resultList.block_status === 'Completed') {
      if (interval) {
        clearInterval(interval);
      }
      getInferBlocks();
    }
  }).catch((e)=>{
    console.log(e)
  });
  }

  const handleFormSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    api.getPublish(uuid,deployBlock).then((result )  => {
      console.log(result)
    }).catch((e)=>{
      console.log(e)
    })
  }
  return (
    <div>
      <Box sx={{width: 300}}>
        <Button variant="contained"
          disabled={isLoadingTrain}
          size="large" sx={{'marginTop': '1rem', 'display':'block', 'width': '100%'}} onClick={() =>startTrain(uuid)}>
          Train
        </Button>
        { (trainResponse.result) ? <Alert severity="success" sx={{'marginTop': '1rem'}}>{ trainResponse.result }</Alert> : '' }
        {(showDeployOptions)?
        <Box>
          <form onSubmit={handleFormSubmit}>
          <FormControl sx={{'width': '100%', 'marginTop': '1rem'}}>
            <InputLabel id="demo-simple-select-label">Block</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={deployBlock}
              label="Age"
              onChange={handleChange}
            >
              {inferBlocks.map((block:any, index) => <MenuItem key={index} value={block.uuid}>{block.name}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="contained" size="large" sx={{'marginTop': '1rem','display':'block', 'width': '100%'}} type='submit'>
            Publish
          </Button>
          </form>
        </Box> : ''}
      </Box>
    </div>
  );
}

export default ActionTab;
