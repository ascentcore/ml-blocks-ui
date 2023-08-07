import { useState, ChangeEvent } from 'react';
import api from '../../api/api';

const usePredictHook = (uuid: string) => {
  const [inputError, setInputError] = useState<boolean>(false);
  const [predictResponse, setPredictResponse] = useState<string>('');
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
      setPredictResponse(e.response.data.response);
      setLoadingPredict(false);
      console.log(e.response.data.response);
    });
  };

  return {
    inputError,
    setInputError,
    predictResponse,
    setPredictResponse,
    loadingPredict,
    handleFormSubmit
  };
};

export default usePredictHook;
