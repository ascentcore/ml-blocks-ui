import {MouseEvent, SyntheticEvent, ReactNode, useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import api from '../api/api';
import {useParams, useNavigate} from 'react-router-dom';
import {CardBlocksProps} from '../components/CardBlock.interface';
import StatusTab from '../components/StatusTab';
import PredictTab from '../components/PredictTab';
import ActionTab from '../components/ActionTab';
import Loading from '../components/ui/Loading';
import Button from '@mui/material/Button';

const Block = () => {

  const { uuid } = useParams();
  const uuidValue = uuid ?? '';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)
  const [ block, setBlock ] = useState<CardBlocksProps>({
    description: '',
    uuid: '',
    ip: '',
    name: '',
    port: '',
    progress: false,
    state: '',
    type: '',
  });

  useEffect(() => {

    api.getBlocks(uuidValue).then((result) => {
      const resultList = JSON.parse(result.data.response);
      if(resultList.length !== 1) navigate('/')
      setBlock(resultList[0]);
      setIsLoading(false);
    }).catch(e=>{
      console.log(e)
      navigate('/')
    });

  }, [uuidValue]);
  function handleClick(event: MouseEvent<Element, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDelete = (uuidValue:string) => {
    const confirmDelete = confirm('Do you really want to perform this action?');
    if(confirmDelete) {
      api.deleteBlock(uuidValue).then((result) => {
        navigate('/')
      }).catch(e=>{
        console.log(e)
        navigate('/')
      });
    }
  }

  const BlockTabPanel = (props: { children?: ReactNode, index: number, value: number;}) => {
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
        <div style={{'display': 'flex', 'alignItems':'center', 'justifyContent': 'space-between'}}>
          <h1>{block.name}</h1>
          {(uuidValue) ? <Button variant="contained" color="error" onClick={() => handleDelete(uuidValue)}>Delete</Button> : ''}
        </div>
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
                { (block.type === 'train') ? <Tab value={1} label="Action" /> : <Tab value={1} label="Predict" /> }
                {/*<Tab value={2} label="Performance" />*/}
              </Tabs>
            </Box>
            <BlockTabPanel value={value} index={0}>
              <StatusTab uuid={uuidValue}/>
            </BlockTabPanel>
            <BlockTabPanel value={value} index={1}>
              { (block.type === 'train') ? <ActionTab uuid={uuidValue}/> : <PredictTab uuid={uuidValue} /> }

            </BlockTabPanel>
            {/*<BlockTabPanel value={value} index={2}>*/}
            {/*  <PerformanceTab uuid={uuidValue}/>*/}
            {/*</BlockTabPanel>*/}
          </Box>
      </Loading>
    </>
  )
}

export default Block;
