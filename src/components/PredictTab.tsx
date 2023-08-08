import api from '../api/api';
import Loading from './ui/Loading';
import ComputerVisionImage from './PredictTabComponents/ComputerVisionImage';
import NaturalLanguageProcessing from './PredictTabComponents/NaturalLanguageProcessing';
import Alert from '@mui/material/Alert';
import {useState, useEffect} from 'react';
interface PredictTabProps {
  uuid: string,
}
interface ActiveInferenceModel {
  result: string,
  content: {
    name: string,
    properties:{
      type: string,
      status: string,
      description: string,
      version: number
    }
  }
}
const ActiveInferenceModelState:ActiveInferenceModel = {
  result: '',
  content: {
    name: '',
    properties:{
      type: '',
      status: '',
      description: '',
      version: 0
    }
  }
}
const PredictTab = ({uuid}:PredictTabProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeInferenceModel, setActiveInferenceModel] = useState<ActiveInferenceModel>(ActiveInferenceModelState);
  const [errorResponse, setErrorResponse] = useState<string>('');
  useEffect(() => {
    getInferenceList(uuid);
  }, [uuid]);

  const getInferenceList = (uuid:string) => {
    setErrorResponse('');
    setActiveInferenceModel(ActiveInferenceModelState);
    api.getActiveInference(uuid).then((result )  => {
      const activeInference = JSON.parse(result.data.response);
      setActiveInferenceModel(activeInference);
      setIsLoading(false)
    }).catch((e)=>{
      setErrorResponse(JSON.parse(e.response.data.response).result);
      setIsLoading(false)
    })
  }
  return (
    <>
      <Loading loading={isLoading}>
        {activeInferenceModel.content.properties.type === 'Computer Vision Image' &&
          <ComputerVisionImage uuid={uuid} />}
        {activeInferenceModel.content.properties.type === 'Natural Language Processing' &&
          <NaturalLanguageProcessing uuid={uuid} />}
        { errorResponse && <Alert severity="error" sx={{ marginTop:'1rem'}}>{ errorResponse }</Alert>}
      </Loading>
    </>
  );
};

export default PredictTab;
