import LinearWithValueLabel from './ui/LinearProgressWithLabel';
import api from '../api/api';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './PerformanceTab.scss'

interface PerformanceTabProps {
  uuid: string
}
const PerformanceTab = ({uuid}:PerformanceTabProps) => {


  const [performanceCPU, setPerformanceCPU] = useState({cpu_percent : '0'})
  const [performanceMemory, setPerformanceMemory] = useState({available: '', free: '', percentage: '0', total: '', used:''})
  const [performanceDiskUsage, setPerformanceDiskUsage] = useState({free: '', percentage: '0', total: '', used:''})
  const [performanceGPU, setPerformanceGPU] = useState({message:'not supported', type:''})

  useEffect(() => {
    fetchPerformanceData();

    const interval = setInterval(fetchPerformanceData, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [uuid])

  const getPerformanceCPU = (uuid:string) => {
    api.getPerformanceCPU(uuid).then((result  ) => {
      setPerformanceCPU( JSON.parse(result.data.response));
    }).catch((e)=>{
      console.log(e)
    })
  }
  const getPerformanceMemory = (uuid:string) =>{
    api.getPerformanceMemory(uuid).then((result  ) => {
      setPerformanceMemory(JSON.parse(result.data.response));
    }).catch((e)=>{
      console.log(e)
    })
  }

  const getPerformanceDiskUsage = (uuid:string) =>{
    api.getPerformanceDiskUsage(uuid).then((result  ) => {
      setPerformanceDiskUsage(JSON.parse(result.data.response));
    }).catch((e)=>{
      console.log(e)
    })
  }

  const getPerformanceGPU = (uuid:string) =>{
    api.getPerformanceGPU(uuid).then((result  ) => {
      setPerformanceGPU(JSON.parse(result.data.response));
    }).catch((e)=>{
      console.log(e)
    })
  }

  const fetchPerformanceData = () => {
    getPerformanceCPU(uuid);
    getPerformanceMemory(uuid);
    getPerformanceDiskUsage(uuid);
    getPerformanceGPU(uuid);
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} sm={3}>
          <Card className='cpuCard card'>
            <CardContent className='cardContent'>
              <p>CPU</p>
              <LinearWithValueLabel value={parseInt(performanceCPU.cpu_percent)}/>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={3}>
          <Card className='memoryCard card'>
            <CardContent className='cardContent'>
              <p>Memory</p>
              <LinearWithValueLabel value={parseInt(performanceMemory.percentage)}/>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={3}>
          <Card className='diskCard card'>
            <CardContent className='cardContent'>
              <p>Disk</p>
              <LinearWithValueLabel value={parseInt(performanceDiskUsage.percentage)}/>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={3}>
          <Card className='gpuCard card'>
            <CardContent className='cardContent'>
              <p>GPU</p>
              <p>{ performanceGPU.message }</p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
export default PerformanceTab
