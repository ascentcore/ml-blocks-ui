import Grid from '@mui/material/Unstable_Grid2';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import './StatusTab.scss'
import {useEffect, useState} from 'react';
import api from '../api/api';
import Loading from './ui/Loading';
import MLBlocksCircularProgress from './ui/MLBlocksCircularProgress';
import * as React from 'react';

interface StatusTabProps {
  uuid: string
}
const StatusTab = ({uuid}:StatusTabProps) => {
  const [performanceCPU, setPerformanceCPU] = useState({cpu_percent : '0'})
  const [performanceMemory, setPerformanceMemory] = useState({available: '', free: '', percentage: '0', total: '', used:''})
  const [performanceDiskUsage, setPerformanceDiskUsage] = useState({free: '', percentage: '0', total: '', used:''})
  const [performanceGPU, setPerformanceGPU] = useState({message:'',gpu_usage:'0',  type:''})
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getPerformance(uuid);
    const interval = setInterval(()=>getPerformance(uuid), 30000);

    return () => {
      clearInterval(interval);
    };
  }, [uuid])

  const getPerformance = (uuid:string) => {
    api.getPerformance(uuid).then((result )  => {
      const [
        performanceCPUResponse,
        performanceMemoryResponse,
        performanceDiskUsageResponse, performanceGPUResponse] = result;

      const performanceCPUDetails = JSON.parse(performanceCPUResponse.data.response);
      const performanceMemoryDetails = JSON.parse(performanceMemoryResponse.data.response);
      const performanceDiskUsageDetails = JSON.parse(performanceDiskUsageResponse.data.response);
      const performanceGPUDetails = JSON.parse(performanceGPUResponse.data.response);

      setPerformanceCPU(performanceCPUDetails);
      setPerformanceMemory(performanceMemoryDetails);
      setPerformanceDiskUsage(performanceDiskUsageDetails);
      setPerformanceGPU(performanceGPUDetails);
      setIsLoading(false)
    }).catch((e)=>{
      console.log(e)
    })
  }

  return (
    <>
      <Loading loading={isLoading}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={3}>
            <Card className='cpuCard card card-performance' elevation={3}>
              <CardContent className='cardContent'>
                <MLBlocksCircularProgress value={parseInt(performanceCPU.cpu_percent)}/>
                <div className='cardWrapper'>
                  <p className='title'>CPU</p>
                  <p className='performance'>{Math.round(parseInt(performanceCPU.cpu_percent))}<span>%</span></p>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={3}>
            <Card className='memoryCard card card-performance' elevation={3}>
              <CardContent className='cardContent'>
                <MLBlocksCircularProgress value={parseInt(performanceMemory.percentage)}/>
                <div className='cardWrapper'>
                  <p className='title'>Memory</p>
                  <p className='performance'>{Math.round(parseInt(performanceMemory.percentage))}<span>%</span></p>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={3}>
            <Card className='diskCard card card-performance' elevation={3}>
              <CardContent className='cardContent'>
                <MLBlocksCircularProgress value={parseInt(performanceDiskUsage.percentage)}/>
                <div className='cardWrapper'>
                  <p className='title'>Disk</p>
                  <p className='performance'>{Math.round(parseInt(performanceDiskUsage.percentage))}<span>%</span></p>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={3}>
            <Card className='gpuCard card card-performance' elevation={3}>
              <CardContent className='cardContent'>
                { performanceGPU.message !== 'not supported' ?
                  <MLBlocksCircularProgress value={parseInt(performanceDiskUsage.percentage)}/> : ''}
                <div className='cardWrapper'>
                  <p className='title'>GPU</p>
                  { performanceGPU.message === 'not supported' ? <p className='performanceError'>Not supported</p> :
                    <p className='performance'>{Math.round(parseInt(performanceGPU.gpu_usage))}<span>%</span></p> }
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Loading>
    </>
  )
}
export default StatusTab
