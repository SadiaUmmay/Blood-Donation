import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';

import Root from './Root/Root.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import DashboardLayout from './dashboardLayout/DashboardLayout.jsx';
import MainDashBoard from './Pages/dashboard/MainDashBoard.jsx';
import ProfileDash from './Pages/dashboard/ProfileDash.jsx';
import DonationRequest from './Pages/dashboard/DonationRequest.jsx';
import CreateDonation from './Pages/dashboard/CreateDonation.jsx';
import AllUsers from './Pages/dashboard/AllUsers.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Search from './Pages/Search.jsx';
import AllDonationRequ from './Pages/dashboard/AllDonationRequ.jsx';
import Funding from './Pages/Funding.jsx';
import PaymentSuccess from './Pages/PaymentSuccess.jsx';
import EditDonationRequest from './Pages/dashboard/EditDonationRequest.jsx';
import PublicDonationRequ from './Pages/PublicDonationRequ.jsx';
import DonationRequestDetails from './Pages/DonationRequestDetails.jsx';
import About from './Pages/About.jsx';
import Blog from './Pages/Blog.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { path:'/', Component: Home },
      { path:'/login', Component: Login },
      { path:'/signup', Component: Register },
      { path:"/donation-requests", Component: PublicDonationRequ },
      { path:"/search", Component: Search },
      { path:"/funding", Component: Funding },
      { path:"/donation-request/:id", element: <DonationRequestDetails /> },
      { path:"/payment-success", Component: PaymentSuccess },
      { path:"/about", Component: About},
      { path:"/blog", Component: Blog},

    ]
  },
  {
    path:"/funding",
    element: <PrivateRoute><Funding /></PrivateRoute>
  },
  {
    path:"/donation-request/:id",
    element: <PrivateRoute><DonationRequestDetails /></PrivateRoute>
  },
  {
    path:"/about",
    element: <About></About>
  },
  {
    path:"/blog",
    element: <Blog></Blog>
  },
  {
    path:"/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children:[
      { path: "/dashboard", Component: MainDashBoard },
      { path: "profiledash", Component: ProfileDash },
      { path: "donationrequest", Component: DonationRequest },
      { path: "createdonation", Component: CreateDonation },
      { path: "allusers", Component: AllUsers },
      { path:"/dashboard/edit-donation-request/:id", Component: EditDonationRequest },
      { path:"all-blood-donation-request", Component: AllDonationRequ }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  
  </StrictMode>
);
