import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import NavbarLayout from 'components/layouts/navbar-layout';
import HomePage from 'pages/home-page';
import SingleBikePage from '../pages/single-bike-page/index';
import BikeFormPage from './pages/BikeFormPage/index';
import routes from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavbarLayout />,
    children: [
      {
        path: routes.HomePage,
        element: <HomePage />,
      },
      {
        path: routes.BikeFormPage,
        element: <BikeFormPage />,
      },
      {
        path: routes.SingleBikePage.path,
        element: <SingleBikePage />,
      },
    ],
  },
]);

export default router;
