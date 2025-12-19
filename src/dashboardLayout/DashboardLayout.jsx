import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../component/Aside';

const DashboardLayout = () => {
    return (
        <div className='flex'>
            <Aside></Aside>
           <div className='flex-1 md:p-5 p-2'>
           <Outlet></Outlet>
           </div>
        </div>
    );
};

export default DashboardLayout;