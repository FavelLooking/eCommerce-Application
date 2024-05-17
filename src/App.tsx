import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Login from './components/login/login_page';
import RegisterPage from './components/registration_form/registration_form_render';
import NotFound from './components/not_found/not_found_page';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <h1>Main Page</h1>
      </div>
    ),
    errorElement: <Navigate to="not-found" replace />,
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
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="not-found" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
