import React, { useState } from 'react';
import { Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom';
// import { SendForgotPasswordLinkApi } from '../../api/request/auth.js';
import LoadableButton from '../../components/buttons/LoadableButton.jsx';
import toast from 'react-hot-toast';

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState({ email: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            // setIsLoading(true);
            // const { data } = await SendForgotPasswordLinkApi(values);
            // if (data?.status) {
            //     toast.success(data?.message);
            //     form.resetFields();
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
                    </div>
                    <p className='font-bold sm:text-4xl text-3xl text-secondary mb-5'>Forgot your password?</p>
                    <p className="text-lg text-secondaryLight2 mb-8">Don’t worry, happens to all of us. Enter your email below to recover your password.</p>
                    <Form.Item type='email' className='mb-0 mt-5' name="email" rules={[
                        { required: true, message: 'Please enter your email.', },
                        { type: 'email', message: 'Please enter valid email.', },
                    ]}>
                        <Input placeholder='Email' size='large' />
                    </Form.Item>
                    <LoadableButton
                        className='bg-primary text-white uppercase text-base font-semibold w-full py-2 rounded-lg mt-7 mb-5'
                        type='submit'
                        lable='Submit'
                        loadingLable='Submiting...'
                        isLoading={isLoading}
                    />
                </Form>
            </div>
            <div className='bg-primaryLight rounded-xl md:w-2/5'>
                <p className='font-bold text-primary sm:text-4xl text-3xl py-5 ps-8'>DoNexus</p>
                <div className='flex flex-col justify-center items-center p-9 my-6'>
                    <img src='/assets/images/forgot_password.svg' className='sm:mt-0 md:h-96' />
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;