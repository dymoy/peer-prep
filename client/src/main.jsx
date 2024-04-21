import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'

import ExploreSessions from './pages/ExploreSessions';
import MySessions from './pages/MySessions';
import AddSession from './pages/AddSession';
import UpdateSession from './pages/UpdateSession';

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
