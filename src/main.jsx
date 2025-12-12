import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './Root/Root.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import DashboardLayout from './dashboardLayout/DashboardLayout.jsx'
import MainDashBoard from './Pages/dashboard/MainDashBoard.jsx'
import ProfileDash from './Pages/dashboard/ProfileDash.jsx'
import DonationRequest from './Pages/dashboard/DonationRequest.jsx'
import CreateDonation from './Pages/dashboard/CreateDonation.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { path:'/', Component: Home },
      {
        path:'/login', Component: Login
      },
      {
        path:'signup', Component: Register
      }
    ]
  },
  {
    path:"/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children:[
      {
        path: "/dashboard",
        Component:MainDashBoard
      },
      {
        path: "profiledash",
        Component: ProfileDash
      },
      {
        path: "donationrequest",
        Component: DonationRequest
      },
      {
        path: "createdonation",
        Component: CreateDonation
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
