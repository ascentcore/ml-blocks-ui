import {useEffect, useState} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import api from '../api/api';
import CardModels from './CardModels';
import Alert from '@mui/material/Alert';
import Loading from './ui/Loading';

interface ModelsTabProps {
  uuid: string,
}
const ModelsTab = ({uuid}: ModelsTabProps) => {
  const [inferenceList, setInferenceList] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getInferenceList(uuid);
  }, [uuid]);

  const getInferenceList = (uuid:string) => {
    setIsLoading(true);
    api.getInferenceList(uuid).then((result )  => {
      const inferenceList = JSON.parse(result.data.response).content;
      setInferenceList(inferenceList);
      setIsLoading(false);
    }).catch((e)=>{
      console.log(e);
      setIsLoading(false);
    })
  }

  return (
    <>
      <Loading loading={isLoading}>
        {inferenceList.length === 0 && <Alert severity="info">No models uploaded!</Alert>}
        <Grid container spacing={2}>
          {inferenceList.map((inference:any, index) => (
            <Grid xs={4} key={index} >
            <CardModels name={inference.name} uuid={inference.properties.uuid} blockUuid={uuid}
              description={inference.properties.description} status={inference.properties.status}
              version={inference.properties.version} onSelectModel={() => getInferenceList(uuid)} />
            </Grid>
          ))}
        </Grid>
      </Loading>
    </>
  )
}

export default ModelsTab
