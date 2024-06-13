import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import LoginPage from './components/login/login_page';
import RegisterPage from './components/registration_form/registration_form_render';
import Header from './components/header';
import MainPage from './components/main/main_page';
import NotFoundPage from './components/not_found/not_found_page';
import { AuthProvider, useAuth } from './hooks/useAuth';
import ProfilePage from './components/profile/profile_page';
import CatalogPage from './components/catalog/catalog_page';
import DetailedProductPage from './components/detailed_product/detailed_product_page';
import ChangePasswordPage from './components/profile/change_password_page';
import CartPage from './components/cart/cart_page';
import AboutUsPage from './components/about_us/about_us_page';

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
  const location = useLocation();

  if (
    (!user && location.pathname === '/profile') ||
    (!user && location.pathname === '/profile/change-password')
  ) {
    return <Navigate to="/login" />;
  }

  if (user && location.pathname === '/login') {
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
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'catalog/:category',
        element: <CatalogPage />,
      },
      {
        path: 'catalog/:category/:subcategory',
        element: <CatalogPage />,
      },
      {
        path: 'catalog/:category/:subcategory/:productId',
        element: <DetailedProductPage />,
      },
      {
        path: 'profile/change-password',
        element: (
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'about',
        element: <AboutUsPage />,
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
