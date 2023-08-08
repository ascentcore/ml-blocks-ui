import { useState, ChangeEvent } from 'react';
import api from '../../api/api';

const usePredictHook = (uuid: string) => {
  const [inputError, setInputError] = useState<boolean>(false);
  const [predictResponse, setPredictResponse] = useState<string>('');
  const [predictErrorResponse, setPredictErrorResponse] = useState<string>('');
  const [loadingPredict, setLoadingPredict] = useState<boolean>(false);

  const handleFormSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputError(false);
    setPredictResponse('');
    const { modelInput } = event.target;

    if (modelInput.value === '') {
      setInputError(true);
      return;
    }
    setLoadingPredict(true);
    postPredict(uuid, modelInput.value);
  };

  const postPredict = (uuid: string, modelInput: string) => {
    api.postPredict(uuid, modelInput).then((result) => {
      setLoadingPredict(false);
    }).catch((e) => {
      console.log('msg', );
      // setPredictResponse(e.response.data.response);
      setPredictErrorResponse(JSON.parse(e.response.data.response).message);
      setLoadingPredict(false);
    });
  };

  return {
    inputError,
    setInputError,
    predictResponse,
    predictErrorResponse,
    setPredictErrorResponse,
    setPredictResponse,
    loadingPredict,
    handleFormSubmit
  };
};

export default usePredictHook;
