import api from '../api/api';
import Loading from './ui/Loading';
import ComputerVisionImage from './PredictTabComponents/ComputerVisionImage';
import NaturalLanguageProcessing from './PredictTabComponents/NaturalLanguageProcessing';
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
  useEffect(() => {
    getInferenceList(uuid);
  }, [uuid]);

  const getInferenceList = (uuid:string) => {
    api.getActiveInference(uuid).then((result )  => {
      const activeInference = JSON.parse(result.data.response);
      // setActiveInferenceModel(activeInference);
      setActiveInferenceModel({
        result: '',
        content: {
          name: '',
          properties:{
            type: 'Computer Vision Image',
            status: '',
            description: '',
            version: 0
          }
        }
      });
      setIsLoading(false)
    }).catch((e)=>{
      console.log(e)
    })
  }
  return (
    <>
      <Loading loading={isLoading}>
        {activeInferenceModel.content.properties.type === 'Natural Language Processing'?
          <NaturalLanguageProcessing uuid={uuid} />: <ComputerVisionImage uuid={uuid} />}
      </Loading>
    </>
  );
};

export default PredictTab;
