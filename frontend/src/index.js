import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import Homepage from './components/homepage/layout/layout';
import AuthPage from './components/authentication/layout/layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const routing = createBrowserRouter([
  {
    path: '/intranet',
    element: <AuthPage />,
    errorElement: <div>There is an error !</div>
  },
  {
    path: '/homepage',
    errorElement: <div>There is an error !</div>,
    element: <Homepage />
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
