import {React, StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import App from './Routes/App';
import Book from './Routes/Book'
import ErrorPage from './error'

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/:key/:keyId',
    element: <Book />,
    errorElement: <ErrorPage />
  }
]);

root.render(
  <StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>  
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
