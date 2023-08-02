import * as React from 'react';
import CircularProgress, { CircularProgressProps} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './MLBlocksCircularProgress.scss';
interface CircularProgressWithLabelProps extends CircularProgressProps {
  value: number;
}

const MLBlocksCircularProgress = (props:CircularProgressProps & CircularProgressWithLabelProps)  =>{

  const progressCircleColor = (value:number) => {
    if(value < 40) {
      return '#1dc101'
    } else if(value < 70) {
      return '#ffa902'
    } else {
      return '#e11440'
    }
  }
  return (
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center'  }}>
      <CircularProgress size="5rem" variant="determinate" {...props} className='foreground' thickness={4} sx={{color: progressCircleColor(props.value)}}/>
      <CircularProgress
        variant="determinate"
        value={100}
        className='background'
        thickness={4}
        size="5rem"
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
      </Box>
    </Box>
  );
}
export default MLBlocksCircularProgress;
