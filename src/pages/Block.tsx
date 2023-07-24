import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {MouseEvent, SyntheticEvent, ReactNode, useEffect, useState} from 'react';
import api from '../api/api';
import {useParams} from 'react-router-dom';
import {CardBlocksProps} from '../components/CardBlock.interface';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import StatusTab from '../components/StatusTab';
import PredictTab from '../components/PredictTab';
import PerformanceTab from '../components/Performance';
import Loading from '../components/ui/Loading';

const Block = () => {

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true)
  const [ block, setBlock ] = useState<CardBlocksProps>({
    description: '',
    id: 0,
    ip: '',
    name: '',
    port: '',
    progress: false,
    status: ''
  });

  useEffect(() => {
    api.getCard(id).then((result) => {
      setBlock(result.data);
      setIsLoading(false);
    }).catch(e=>console.log(e));

    // api.getLogs().then((result) => {
    //   console.log(result)
    // }).catch((e)=> console.log(e));
  }, [id]);

  function handleClick(event: MouseEvent<Element, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function BlockTabPanel(props: { children?: ReactNode, index: number, value: number;}) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  return(
    <>
      <Loading loading={isLoading}>
        <h1>{block.name}</h1>
        { (block.name)?
        <div role="presentation" onClick={() => handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
             <Typography color="text.primary">{block.name}</Typography>
          </Breadcrumbs>
        </div>
          : ''}

          <Box sx={{ width: '100%', pt: 4 }}>
            <Box>
              <Tabs value={value} onChange={handleChange} aria-label="block tabs">
                <Tab value={0} label="Status" />
                <Tab value={1} label="Predict" />
                <Tab value={2} label="Performance" />
              </Tabs>
            </Box>
            <BlockTabPanel value={value} index={0}>
              <StatusTab />
            </BlockTabPanel>
            <BlockTabPanel value={value} index={1}>
              <PredictTab />
            </BlockTabPanel>
            <BlockTabPanel value={value} index={2}>
              <PerformanceTab />
            </BlockTabPanel>
          </Box>
      </Loading>
    </>
  )
}

export default Block;
