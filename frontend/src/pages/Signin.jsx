import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import { useNavigate } from 'react-router-dom'
import api from '../api'

const Signin = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const postData = async (e) =>{
    e.preventDefault();

    try {
      const res = await api.post('/user/signin', user);
      console.log(res.data);

      if (res.status === 200) {  // Check for successful response
        // Save token to localStorage
        if (res.data && res.data.token) {
          try {
            localStorage.setItem('token', res.data.token);
            console.log('token saved (signin):', localStorage.getItem('token'));
          } catch (e) {
            console.error('Failed to save token to localStorage (signin):', e);
          }
        }
        navigate(`/dashboard?name=${res.data.firstName}`);
      }
    } catch (error) {
      console.error('Error during signin:', error);
    }
  }

  return (
    <div className='mx-auto my-8 py-8 bg-gray-400 min-w-[300px] max-w-[1000px]'>
      <div className='my-10 mx-auto p-2 min-w-[300px] max-w-[500px] bg-white rounded-md'>
        <div className='flex flex-col items-center justify-center mx-auto w-[300px]'>
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <form>
            <InputBox 
              label={"Email"} 
              type={"email"} 
              placeholder={"abc@gmail"} 
              onChangeHandler={(e)=> setUser({...user, username: e.target.value })}
            />
            <InputBox 
              label={"Password"} 
              type={"password"} 
              placeholder={"123456"} 
              onChangeHandler={(e)=> setUser({...user, password: e.target.value })}
            />
            <Button 
              label={"Sign in"} 
              type="button" // Added type="button" to prevent form submission
              onClickHandler={postData}
            />
            <BottomWarning 
              text={"Don't have an account?"} 
              label={"Sign up"} 
              to={"/signup"} 
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin