import Grid from '@mui/material/Unstable_Grid2';
import RegisterVM from '../components/RegisterVM';
import CardBlocks from '../components/CardBlocks';
import {useEffect, useState} from 'react';
import api from '../api/api';
import Alert from '@mui/material/Alert';
import Loading from '../components/ui/Loading';


const Home = () => {

  const [cardElements, setCardElements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getBlocks();
  }, []);

  const getBlocks = () => {

    api.getBlocks().then((result) => {
      const resultList = JSON.parse(result.data.response);
      setCardElements(resultList);
      setIsLoading(false);
    }).catch((e)=> {
      console.log(e)
      setIsLoading(false);
    });
  }

  const handleOnRegisterVM = () => {
    getBlocks();
  }

  const displayCardElements = (data: Array<{
      uuid:string,
      ip: string,
      port:string,
      progress:boolean,
      name: string,
      state:string,
      description: string}>) => {
    return data.map((card, index) =>
      (
        <Grid xs={6} sm={4} key={index}>
          <CardBlocks
            ip={card.ip}
            uuid={card.uuid}
            port={card.port}
            progress={card.progress}
            name={card.name}
            state={card.state}
            description={card.description} />
        </Grid>
      )
    )
  }

  return(
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <RegisterVM  onRegisterVM={handleOnRegisterVM}/>
        </Grid>
        <Grid xs={12}>
          <Loading loading={isLoading}>
            <Grid container spacing={2}>
              {
              (cardElements.length > 0) ?
              displayCardElements(cardElements)
              :
              <div style={{'margin': '0 auto'}}>
                <Alert severity="info">{'Oops! It seems you haven\'t registered any VM yet'}</Alert>
              </div>
              }
            </Grid>
          </Loading>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
