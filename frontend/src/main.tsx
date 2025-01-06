// Libraries Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@/index.css';
// Routes Imports
import Home from '@/routes/home';
import Project from '@/routes/project';
import Branch from '@/routes/branch';
import Profile from '@/routes/profile';
// Components Imports
import Navmenu from '@/components/ui/navmenu';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/:projectId',
    element: <Project />,
    children: [
      {
        path: ':branchId',
        element: <Branch />,
      },
    ],
  },
  {
    path: '/profile/:profileId',
    element: <Profile />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="bg-gradient min-h-screen">
        <Navmenu />
        <div className="flex items-center justify-center p-2 md:p-10 lg:p-20">
          <RouterProvider router={router} />
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
