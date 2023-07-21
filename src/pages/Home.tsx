import Grid from '@mui/material/Unstable_Grid2';
import RegisterVM from '../components/RegisterVM';
import CardBlocks from '../components/CardBlocks';
import {useEffect, useState} from 'react';
import api from '../api/api';

const Home = () => {

  const [cardElements, setCardElements] = useState([]);

  useEffect(() => {
    api.getCards().then((result) => {
      setCardElements(result.data);
    }).catch(e=>console.log(e));

    api.getLogs().then((result) => {
      console.log(result)
    }).catch((e)=> console.log(e));
  }, []);

  const displayCardElements = (data: Array<{
      id:number,
      ip: string,
      port:string,
      progress:boolean,
      name: string,
      status:string,
      description: string}>) => {
    return data.map((card, index) =>
      (
        <Grid xs={4} key={index}>
          <CardBlocks
            ip={card.ip}
            id={card.id}
            port={card.port}
            progress={card.progress}
            name={card.name}
            status={card.status}
            description={card.description} />
        </Grid>
      )
    )
  }

  return(
    <>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <RegisterVM />
          </Grid>
          {displayCardElements(cardElements) }
        </Grid>
    </>
  )
}

export default Home
