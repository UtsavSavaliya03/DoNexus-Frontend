import React from 'react';
import { Modal } from 'antd';
import LoadableButton from '../buttons/LoadableButton.jsx';

export default function ConfirmationModal({ isOpen = false, setIsOpen, width, type, message, subMessage = '', onConfirm, isLoading, loadingLabel = 'Loading...' }) {

    return (
        <Modal open={isOpen} closeIcon={false} footer={false} maskClosable={false} keyboard={false} width={width}>
            <div className='lg:pb-1'>
                <div className='p-6'>
                    <div className="flex justify-center mt-4">
                        {type == 'success' ? (<img src="/assets/icons/success-icon.svg" alt="icon" width={100} />) : (<img src="/assets/icons/warning-icon.svg" alt="icon" width={100} />)}
                    </div>
                    <p className='text-xl font-semibold text-center mt-8'>{message}</p>
                    <p className='text-secondaryLight1 font-medium text-center mb-8 mt-2'>{subMessage}</p>
                    <div className='flex justify-center items-center gap-5 mt-5'>
                        <button onClick={() => setIsOpen(false)} disabled={isLoading} className='bg-[#D91819] text-sm text-white font-medium uppercase px-10 py-2 rounded-lg hover:bg-[#aa0001] duration-500'>No</button>
                        <LoadableButton
                            className='bg-[#2D9B63] text-sm text-white font-medium uppercase px-10 py-2 rounded-lg hover:bg-[#096034] duration-500'
                            onClick={() => onConfirm()}
                            disabled={isLoading}
                            lable='Yes'
                            isLoading={isLoading}
                            loadingLable={loadingLabel}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}
