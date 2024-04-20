import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ExploreSessions from './pages/ExploreSessions';
import MySessions from './pages/MySessions';
import AddSession from './pages/AddSession';
import UpdateSession from './pages/UpdateSession';
import 'bootstrap/dist/css/bootstrap.min.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ExploreSessions />,
      },
      {
        path: 'mysessions',
        element: <MySessions />,
      },
      {
        path: 'addsession',
        element: <AddSession />
      },
      {
        path: 'updatesession',
        element: <UpdateSession/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);