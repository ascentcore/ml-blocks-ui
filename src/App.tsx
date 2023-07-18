import React from 'react';
import './App.css';
import router from './routes';
import { RouterProvider } from 'react-router-dom'
import MenuDrawer from './components/ui/MenuDrawer';
import { Container } from '@mui/system';
function App() {
  return (
    <div className="App">
      <MenuDrawer />
      <Container style={{'paddingTop' : '2rem'}}>
        <RouterProvider router={router} />
      </Container>
    </div>
  );
}

export default App;
