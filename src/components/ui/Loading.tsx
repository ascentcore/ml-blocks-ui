import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {ReactNode} from 'react';


interface LoadingProps {
  children: ReactNode,
  loading: boolean
}
const Loading = ({children, loading}: LoadingProps) => {
  return (
    (loading) ?
    <Box sx={{ display: 'flex', 'justifyContent':'center', 'alignItems': 'center' }}>
      <CircularProgress />
    </Box>
    : <>{ children }</>
  );
}

export default Loading
