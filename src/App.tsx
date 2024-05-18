import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import LoginPage from './components/login/login_page';
import RegisterPage from './components/registration_form/registration_form_render';
import Header from './components/header';
import MainPage from './components/main/main_page';
import NotFoundPage from './components/not_found/not_found_page';

function Root() {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: 'not-found',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <Navigate to="not-found" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
