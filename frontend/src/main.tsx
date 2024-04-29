import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './routes/home';
import { ThemeProvider } from '@/contexts/theme-provider';
import { UserProvider } from '@/contexts/user-provider';
import Navmenu from './components/ui/navmenu';
import JWTGet from './routes/JWTGet';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/jwt",
    element: <JWTGet />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider defaultTheme="dark" storageKey="catalyst-theme">
        <Navmenu />
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>,
)
