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
import { AuthProvider, useAuth } from './hooks/useAuth';
import { CatalogPage, catalogLoader } from './components/catalog/catalog_page';
import DetailedProductPage from './components/detailed_product/detailed_product_page';

function Root() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Header />
        <Outlet />
      </div>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }
  return children;
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
        element: (
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'catalog',
        element: <CatalogPage />,
        loader: catalogLoader,
      },
      {
        path: 'catalog/category/subcategory/:productId',
        element: <DetailedProductPage />,
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
