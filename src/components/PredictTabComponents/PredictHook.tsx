import { useState, ChangeEvent } from 'react';
import api from '../../api/api';

const usePredictHook = (uuid: string) => {
  const [inputError, setInputError] = useState<boolean>(false);
  const [predictResponse, setPredictResponse] = useState<string>('');
  const [predictErrorResponse, setPredictErrorResponse] = useState<string>('');
  const [loadingPredict, setLoadingPredict] = useState<boolean>(false);
  const [showPredictResponse, setShowPredictResponse] = useState<boolean>(false);

  const handleFormSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputError(false);
    setPredictResponse('');
    setShowPredictResponse(true);
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
      setPredictResponse(JSON.parse(result.data.response).payload);
      setLoadingPredict(false);
    }).catch((e) => {
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
    showPredictResponse,
    handleFormSubmit
  };
};

export default usePredictHook;
