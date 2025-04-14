import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import LoadableButton from '../../components/buttons/LoadableButton.jsx';
// import { ChangePasswordApi } from '../../api/request/auth.js';
import { setCookies, removeCookies } from "../../services/Cookies.js";
import toast from 'react-hot-toast';

const ChangePassword = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState({ new_password: '', confirm_password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useParams();

    useEffect(() => {
        setCookies('passwordToken', token);
    }, [token]);

    const handleSubmit = async (values) => {
        try {
            // setIsLoading(true);
            // delete values?.confirm_password;
            // const { data } = await ChangePasswordApi(values);
            // if (data?.status) {
            //     toast.success(data?.message);
            //     form.resetFields();
            //     removeCookies('passwordToken');
            //     navigate('/login');
            // }
            // setIsLoading(false);
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
            setIsLoading(false);
        }
    }

    return (
        <div className="h-[100vh] md:flex items-center justify-center gap-5 p-6 md:p-6">
            <div className='md:w-2/5'>
                <Form autoComplete='off' className='sm:w-3/4 w-full' form={form} initialValues={initialValues} onFinish={handleSubmit}>
                    <div className='text-primary font-semibold text-lg flex items-center mb-5 cursor-pointer' onClick={() => navigate(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-5 mr-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                        Back
                    </div>                    <p className='font-bold sm:text-5xl text-3xl text-secondary mb-5'>Change password</p>
                    <p className="text-lg text-secondaryLight2 mb-8">Your previous password has been reseted. Please set a new password for your account.</p>
                    <Form.Item name="new_password" className='mb-0 mt-5' rules={[
                        { required: true, message: 'Please input your new password!', },
                        {
                            pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                            message: 'Please enter strong password.',
                        },
                    ]}>
                        <Input.Password placeholder='New password' size='large' />
                    </Form.Item>
                    <Form.Item name="confirm_password" className='mb-0 mt-5' rules={[
                        { required: true, message: 'Please input your  confirm password!', },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('new_password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}>
                        <Input.Password placeholder='Confirm password' size='large' />
                    </Form.Item>
                    <LoadableButton
                        className='bg-primary text-white uppercase text-base font-semibold w-full py-2 rounded-lg mt-7 mb-5'
                        type='submit'
                        lable='Save password'
                        loadingLable='Saving password...'
                        isLoading={isLoading}
                    />
                </Form>
            </div>
            <div className='bg-primaryLight rounded-xl md:w-2/5'>
                <p className='font-bold text-primary sm:text-4xl text-3xl py-5 ps-8'>DoNexus</p>
                <div className='flex flex-col justify-center items-center p-9 my-6'>
                    <img src='/assets/images/change_password.svg' className='sm:mt-0 md:h-96' />
                </div>
            </div>
        </div>
    )
}

export default ChangePassword