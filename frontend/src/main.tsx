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
import Sidebar from './components/ui/sidebar';
import Project from './routes/project';
import Branch from './routes/branch';
import Profile from './components/user/profile-main';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/jwt",
    element: <JWTGet />
  },
  {
    path: "/:projectId",
    element: <Project />,
    children: [
      {
        path: ":branchId",
        element: <Branch />
      }
    ]
  },
  {
    path: "/profile/:userId",
    element: <Profile />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider defaultTheme="dark" storageKey="catalyst-theme">
        <Navmenu />
        <Sidebar />
        <div className='p-2 md:p-10 lg:p-20 flex items-center justify-center'>
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>,
)
