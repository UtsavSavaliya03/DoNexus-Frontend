import React, { useEffect, useState } from 'react';
import './Sidebar.scss';
import { SidebarData } from './sidebarData/SidebarData.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeCookies } from "../../../services/Cookies.js";
import { useDispatch } from 'react-redux';
import { setloggedIn } from "../../../store/Slices/userSlice.js";
import { useSelector } from 'react-redux';
import ConfirmationModal from '../../modals/ConfirmationModal.jsx';

export default function AppSidebar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getFirstPath = (path) => {
        const parts = path.split('/');
        return parts.length > 1 ? '/' + parts[1] : path;
    }

    const isActivePath = (path) => {
        let active = false;
        path?.map((item) => {
            if (item == (getFirstPath(pathname))) {
                active = true;
            }
        })
        return active;
    }

    const logoutHandler = async () => {
        setIsLoading(true);
        localStorage.clear();
        dispatch(setloggedIn(false));
        removeCookies('token');
        navigate('/');
        setIsLoading(false);
    }

    return (
        <div className='sidebar-container w-[250px] fixed border-r-2'>
            <div className='border-b-2 p-4'>
                <p className='text-primary text-3xl font-bold text-center mt-1'>DoNexus</p>
            </div>

            <div className='h-[calc(100vh-158px)] overflow-y-auto my-3'>
                {
                    SidebarData?.map((item, index) => {
                        const iconWithProps = (item?.icon ? React.cloneElement(item?.icon, { active: isActivePath(item?.activeUrl) }) : null)
                        return (
                            <div className='flex items-center gap-3 my-3 mb-5 mr-4'>
                                <div className={`w-1 h-10 rounded-e-md duration-200 ${isActivePath(item?.activeUrl) ? ' bg-primary' : null}`}>
                                </div>
                                <div key={index} onClick={() => navigate(item?.url)} className={`font-medium cursor-pointer duration-200 w-full ${isActivePath(item?.activeUrl) ? ' text-primary bg-primaryLight rounded-lg font-semibold' : null}`}>
                                    <button className='flex items-center w-full py-2 px-6'>
                                        {iconWithProps}
                                        <p className='text-base ms-3'>{item?.title}</p>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='px-4 pb-5'>
                <button onClick={() => setIsModalOpen(true)} className='flex items-center justify-center gap-3 bg-primary text-white uppercase text-base font-semibold w-full py-2 rounded-lg'>
                    <img src='/assets/icons/logout.svg' className='h-5' alt='icon' />
                    <p>Logout</p>
                </button>
            </div>

            {/* --- Loguot confirmation modal --- */}
            <ConfirmationModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                message='Are you sure you want to logout?'
                onConfirm={logoutHandler}
                isLoading={isLoading}
                loadingLabel='Loging out...'
            />
        </div>
    )
}