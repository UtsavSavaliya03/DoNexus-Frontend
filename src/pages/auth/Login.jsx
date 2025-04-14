import React, { useState } from 'react';
import { Checkbox, Form, Input } from 'antd';
import { LoginApi } from '../../api/request/auth.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadableButton from '../../components/buttons/LoadableButton.jsx';
import { useDispatch } from 'react-redux';
import { setUserDetails, setloggedIn } from "../../store/Slices/userSlice.js";
import { setCookies } from "../../services/Cookies.js";

export default function Login() {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({ email: "", password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const { data } = await LoginApi(values);
      if (data?.status) {
        setCookies('token', data?.token);
        dispatch(setloggedIn(true));
        dispatch(setUserDetails(data?.data));
        toast.success(data?.message);
        form.resetFields();
        navigate('/dashboard');
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

          <p className='font-bold sm:text-5xl text-3xl text-secondary mb-5'>Login</p>
          <p className="text-lg text-secondaryLight2 mb-8">Login to access your <span className='text-primary font-bold'>DoNexus</span> account</p>

          <Form.Item name="email" className='mb-0 mt-5 w-full' rules={[
            { required: true, message: 'Please enter your email.', },
            { type: 'email', message: 'Please enter valid email.', },
          ]}>
            <Input placeholder='Email' size='large' />
          </Form.Item>
          <Form.Item name="password" className='mb-0 mt-5' rules={[{ required: true, message: 'Please enter your password.', },]}>
            <Input.Password placeholder='Password' size='large' />
          </Form.Item>
          <div className='flex justify-between items-center mt-5'>
            <Form.Item name="remember" valuePropName="checked" className='mb-0'>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <p className='text-primary underline cursor-pointer font-semibold' onClick={() => navigate('/forgot_password')}>Forgot Password?</p>
          </div>
          <LoadableButton
            type="submit"
            className='bg-primary text-white uppercase text-base font-semibold w-full py-2 rounded-lg mt-8 mb-5'
            lable='Login'
            loadingLable='Logging in...'
            isLoading={isLoading}
          />
          <p className='text-center font-semibold mb-5'>Don't have an account? <span className='underline text-primary cursor-pointer' onClick={() => navigate('/signup')}> Sign up </span></p>
        </Form>
      </div>
      <div className='bg-primaryLight rounded-xl md:w-2/5'>
        <p className='font-bold text-primary sm:text-4xl text-3xl py-5 ps-8'>DoNexus</p>
        <div className='flex flex-col justify-center items-center p-9 my-6'>
          <img src='/assets/images/login.svg' className='sm:mt-0 md:h-96' />
        </div>
      </div>
    </div>
  )
}