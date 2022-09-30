import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import AuthPage from './components/authentication/main/authentication';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AxiosErrors from './components/backend-errors/backendErrors';
const routing = createBrowserRouter([
  {
    path: '/intranet',
    element: <AuthPage />,
    errorElement: <AxiosErrors />
  },
  {
    path: '/homepage',
    errorElement: <AxiosErrors />,
    element: <div>HOMEPAGE</div>
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routing} />
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
