import React, { useState } from 'react';
import { Checkbox, Form, Input } from 'antd';
import { SignupApi } from '../../api/request/auth.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadableButton from '../../components/buttons/LoadableButton.jsx';

export default function Signup() {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({ fName: '', lName: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const { data } = await SignupApi(values);
      if (data?.status) {
        toast.success(data?.message);
        form.resetFields();
        navigate('/');
      }
      setIsLoading(false);
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
        <Form autoComplete='off' className='sm:w-4/5 w-full' form={form} initialValues={initialValues} onFinish={handleSubmit}>
          <p className='font-bold sm:text-5xl text-3xl text-secondary mb-5'>Sign up</p>
          <p className="text-lg text-secondaryLight2 mb-8">Create your <span className='text-primary font-bold'>DoNexus</span> account</p>
          <div className='grid lg:grid-flow-col gap-4'>
            <Form.Item name="fName" className='mb-0' rules={[{ required: true, message: 'Please enter your first name.', },]}>
              <Input placeholder='First name' size='large' />
            </Form.Item>
            <Form.Item name="lName" className='mb-0' rules={[{ required: true, message: 'Please enter your last name.', },]}>
              <Input placeholder='Last name' size='large' />
            </Form.Item>
          </div>
          <Form.Item name="email" className='mb-0 mt-5' rules={[
            { required: true, type: 'email', message: 'Please enter your email address.' }
          ]}>
            <Input placeholder='Email address' size='large' />
          </Form.Item>
          <Form.Item name="password" className='mb-0 mt-5' rules={[
            { required: true, message: 'Please enter your password!' },
            {
              pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
              message: 'Please enter strong password.',
            },
          ]}>
            <Input.Password placeholder='Password' size='large' />
          </Form.Item>
          <Form.Item name="confirmPassword" className='mb-0 mt-5' rules={[
            { required: true, message: 'Please input your  confirm password.', },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match.'));
              },
            }),
          ]}>
            <Input.Password placeholder='Confirm password' size='large' />
          </Form.Item>
          <LoadableButton
            className='bg-primary text-white uppercase text-base font-semibold w-full py-2 rounded-lg mt-7 mb-5'
            type='submit'
            lable='Create Account'
            loadingLable='Createing Account...'
            isLoading={isLoading}
          />
          <p className='text-center font-semibold mb-5'>Already have an account? <span className='underline text-primary cursor-pointer' onClick={() => navigate('/')}> Login </span></p>
        </Form>
      </div>
      <div className='bg-primaryLight rounded-xl md:w-2/5'>
        <p className='font-bold text-primary sm:text-4xl text-3xl py-5 ps-8'>DoNexus</p>
        <div className='flex flex-col justify-center items-center p-9 my-6'>
          <img src='/assets/images/signup.svg' className='sm:mt-0 md:h-96' />
        </div>
      </div>
    </div>
  )
}