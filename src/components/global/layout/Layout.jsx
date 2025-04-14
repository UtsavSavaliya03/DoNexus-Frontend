import React, { useState } from 'react';
import AppSidebar from '../sidebar/Sidebar.jsx';
import { motion } from "framer-motion";
import Header from "../header/Header.jsx";

export default function AppLayout({ children, title = "Tax Tribe" }) {

  const [collapsed, setCollapsed] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div>
      <div className='flex '>
        <motion.div className='hidden lg:block' animate={{ marginLeft: collapsed ? "0px" : "-250px", transition: { duration: 0.5 } }}>
          <AppSidebar />
        </motion.div>
        <div className={`bg-white lg:ml-[250px] ${collapsed ? 'lg:w-[calc(100%-250px)]' : 'lg:w-full'} w-full `} >
          <Header collapsed={collapsed} title={title} setCollapsed={setCollapsed} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
          <div className='px-2 md:px-4 pt-2 md:pt-4'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}