import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/login/login_page';
import RegisterPage from './components/registration_form/registration_form_render';
import Main from './components/main/main_page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: 'not-found',
    element: (
      <div>
        <h1>404 Page Not Found</h1>
      </div>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
