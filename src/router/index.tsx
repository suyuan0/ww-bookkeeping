import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Dashboard from '../pages/Dashboard';
import AddTransaction from '../pages/AddTransaction';
import History from '../pages/History';
import Statistics from '../pages/Statistics';
import Settings from '../pages/Settings';
import { ROUTES } from '../utils/constants';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.ADD_TRANSACTION,
        element: <AddTransaction />,
      },
      {
        path: ROUTES.HISTORY,
        element: <History />,
      },
      {
        path: ROUTES.STATISTICS,
        element: <Statistics />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <Settings />,
      },
    ],
  },
]);
