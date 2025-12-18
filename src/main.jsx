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
import Funding from './Pages/Funding.jsx'
import PaymentSuccess from './Pages/PaymentSuccess.jsx'
import ManageDonation from './Pages/dashboard/ManageDonation.jsx'
import EditDonationRequest from './Pages/dashboard/EditDonationRequest.jsx'
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
      },
      {
        path:"/funding",
        Component: Funding
      },
      {
        path:"/payment-success",
        Component: PaymentSuccess
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
    path:"/funding",
    element: <PrivateRoute><Funding></Funding></PrivateRoute>
  },
  {
    path:"/payment-success",
    Component: PaymentSuccess
  },
  {
    path:"/edit-donation-request",
    Component: EditDonationRequest
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
        path:"/dashboard/edit-donation-request/:id",
        Component: EditDonationRequest
      }
      ,
      {
        path:"edit-donation-request/:id",
        Component: EditDonationRequest
      },
      {
        path: "manage-donation-request",
        Component: ManageDonation
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <>
     <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </>,
)
