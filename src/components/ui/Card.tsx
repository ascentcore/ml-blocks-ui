import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {ReactNode} from 'react';

interface CardProps {
  children: ReactNode
}

const CardElement = ({children}: CardProps) => {
  return(
    <Card>
      <CardContent>
        {children}
      </CardContent>
    </Card>
    )
}

export default CardElement
