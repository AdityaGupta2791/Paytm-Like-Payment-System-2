import React, { useState } from 'react';
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

  const navigate = useNavigate();

  const postData = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
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
    }
  };

  return (
    <div className='mx-auto my-8 py-8 bg-gray-400 min-w-[300px] max-w-[1000px]'>
      <div className='my-10 mx-auto p-2 min-w-[300px] max-w-[500px] bg-white rounded-md'>
        <div className='flex flex-col items-center justify-center mx-auto w-[300px]'>
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <form>
            <InputBox 
              label={"First Name"} 
              type={"text"} 
              placeholder={"John"} 
              onChangeHandler={(e) => setUser({ ...user, firstName: e.target.value })} 
            />
            <InputBox 
              label={"Last Name"} 
              type={"text"} 
              placeholder={"Doe"} 
              onChangeHandler={(e) => setUser({ ...user, lastName: e.target.value })}
            />
            <InputBox 
              label={"Email"} 
              type={"email"} 
              placeholder={"abc@gmail"} 
              onChangeHandler={(e) => setUser({ ...user, username: e.target.value })} 
            />
            <InputBox 
              label={"Password"} 
              type={"password"} 
              placeholder={"123456"} 
              onChangeHandler={(e) => setUser({ ...user, password: e.target.value })} 
            />
            <Button 
              label={"Sign up"}
              type="button" // Added type="button" to prevent form submission
              onClickHandler={postData} 
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
