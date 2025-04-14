import React from 'react';
import { Modal } from 'antd';

export default function ModalComponent({ isOpen = false, setIsOpen, title, children, width, onCancel = () => { } }) {

    const handleCancel = () => {
        onCancel();
        setIsOpen(false);
    };

    return (
        <Modal open={isOpen} closeIcon={false} onCancel={handleCancel} footer={false} maskClosable={false} width={width} keyboard={false}>
            <div>
                {title &&
                    <div className='flex items-center justify-between'>
                        <p className={`text-xl text-[#2F2B3D] font-semibold`}>{title}</p>
                        <svg onClick={handleCancel} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D32E2E" className="w-6 h-6 cursor-pointer duration-300">
                            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                }
                <div>{children}</div>
            </div>
        </Modal>
    )
}
