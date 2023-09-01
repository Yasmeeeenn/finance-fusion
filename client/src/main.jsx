import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage.jsx'
import Error from './pages/Error'

import BorderComponent from './components/Border';
import './font.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (<BorderComponent>
      <App />
      </BorderComponent>),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
