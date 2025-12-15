import React, { useState, useEffect } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) navigate('/dashboard', { replace: true });
    } catch (e) {
      // ignore
    }
  }, [navigate]);

  const postData = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setServerError('');
    // simple client-side validation
    const errs = {};
    if (!user.firstName || user.firstName.trim().length === 0) errs.firstName = 'First name is required';
    if (!user.lastName || user.lastName.trim().length === 0) errs.lastName = 'Last name is required';
    if (!user.username || user.username.trim().length === 0) errs.username = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.username)) errs.username = 'Enter a valid email';
    if (!user.password || user.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});

    try {
      setLoading(true);
      const res = await api.post('/user/signup', user);
      console.log(res.data.msg);

      if (res.status === 201) {
        if (res.data && res.data.token) {
          try {
            localStorage.setItem('token', res.data.token);
          } catch (e) {
            console.error('Failed to save token to localStorage (signup):', e);
          }
        }

        if (res.data && res.data.firstName) {
          try {
            localStorage.setItem('name', res.data.firstName);
          } catch (e) {
            console.error('Failed to save name to localStorage (signup):', e);
          }
        }

        try { window.dispatchEvent(new Event('authChanged')); } catch (e) {}
        
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setServerError(error?.response?.data?.msg || error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-auto my-8 py-8 bg-gray-400 min-w-[300px] max-w-[1000px]'>
      <div className='my-10 mx-auto p-2 min-w-[300px] max-w-[500px] bg-white rounded-md'>
        <div className='flex flex-col items-center justify-center mx-auto w-[300px]'>
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <form onSubmit={postData}>
            {serverError && <p className='text-sm text-red-600 mb-2'>{serverError}</p>}
            <InputBox 
              label={"First Name"} 
              name="firstName"
              type={"text"} 
              placeholder={"John"} 
              onChangeHandler={(e) => setUser({ ...user, firstName: e.target.value })}
              value={user.firstName}
              error={errors.firstName}
            />
            <InputBox 
              label={"Last Name"} 
              name="lastName"
              type={"text"} 
              placeholder={"Doe"} 
              onChangeHandler={(e) => setUser({ ...user, lastName: e.target.value })}
              value={user.lastName}
              error={errors.lastName}
            />
            <InputBox 
              label={"Email"} 
              name="username"
              type={"email"} 
              placeholder={"abc@gmail"} 
              onChangeHandler={(e) => setUser({ ...user, username: e.target.value })} 
              value={user.username}
              error={errors.username}
            />
            <InputBox 
              label={"Password"} 
              name="password"
              type={"password"} 
              placeholder={"123456"} 
              onChangeHandler={(e) => setUser({ ...user, password: e.target.value })} 
              value={user.password}
              error={errors.password}
            />
            <Button 
              label={"Sign up"}
              type="submit"
              onClickHandler={postData} 
              disabled={loading}
              loading={loading}
            />
            <BottomWarning 
              text={"Already have an account?"} 
              label={"Sign in"} 
              to={"/signin"} 
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
