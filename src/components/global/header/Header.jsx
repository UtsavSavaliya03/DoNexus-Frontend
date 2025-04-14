import { Avatar } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Header({ collapsed, setCollapsed, isDrawerOpen, setIsDrawerOpen, title }) {

  const userDetails = useSelector((state) => state.user.userDetails);

  const getInitials = (name) => {
    const nameParts = name?.trim()?.split(' ');
    if (nameParts) {
      const initials = nameParts[0][0] + nameParts[nameParts.length - 1][0];
      return initials.toUpperCase();
    }
  };

  return (
    <div className='border-b-2 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <svg onClick={() => setCollapsed(!collapsed)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer hidden lg:block">
            <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
          </svg>
          <svg onClick={() => setIsDrawerOpen(!isDrawerOpen)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer lg:hidden">
            <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
          </svg>
          <p className="text-xl font-bold capitalize hidden md:block">{title}</p>
        </div>
        <div className='flex items-center gap-3 divide-x-2'>
          <div className='ps-3'>
            <div className='flex items-center gap-3 cursor-pointer'>
              <Avatar size='large' className='bg-primary uppercase text-lg'>{getInitials(`${userDetails?.fName} ${userDetails?.lName}`)}</Avatar>
              <div>
                <p className='leading-5 capitalize font-medium'>{userDetails?.fName} {userDetails?.lName}</p>
                <p className='text-sm text-gray-400'>{userDetails?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}