import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Block from './pages/Block';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: <div>Dashboard</div>,
  },
  {
    path:'/block/:id',
    element: <Block />
  }
]);

export default router
