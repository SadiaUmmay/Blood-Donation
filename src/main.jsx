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
import AllUsers from './Pages/dashboard/AllUsers.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import Search from './Pages/Search.jsx'
import AllDonationRequ from './Pages/dashboard/AllDonationRequ.jsx'
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
      },
      {
        path:"/donation-requests",
        Component: DonationRequest
      },
      {
        path:"/search",
        Component: Search
      }
    ]
  },
  {
    path:"/donation-requests",
    Component: DonationRequest
  },
  {
    path:"/search",
    Component: Search
  },
  {
    path:"/dashboard",
    element: <PrivateRoute> <DashboardLayout></DashboardLayout></PrivateRoute>,
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
      },
      {
        path: "allusers",
        Component: AllUsers
      },
      {
        path: "all-blood-donation-request",
        Component: AllDonationRequ
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
