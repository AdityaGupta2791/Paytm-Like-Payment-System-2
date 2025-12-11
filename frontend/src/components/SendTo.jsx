import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import api from '../api';

const SendTo = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const [amount, setAmount] = useState();

  const onClickHandler = async () =>{
    try {
      await api.post('/account/transfer', { to: id, amount });
      // optionally provide feedback here
    } catch (err) {
      console.error('Transfer error:', err);
    }
  }
  
  return (
    <div className='mx-8 mt-16 py-5 px-2'>
      <div className='inline-flex items-center'>
        <div className='flex justify-center w-[40px] h-[40px] rounded-full bg-green-500'>
        <div className='flex flex-col justify-center h-full text-xl'>
          {name[0].toUpperCase()}
        </div>
        </div>
        <h1 className='text-2xl font-bold ml-3'>{name}</h1>
      </div>
      <div className='my-10 space-y-2'>
        <p className='text-md font-semibold'>Amount in ₹</p>
        <input 
          type="text" 
          placeholder='Enter amount' 
          className='w-full text-md font-normal py-1 px-2 border border-gray rounded-md'
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button
      onClick={onClickHandler} 
      className='w-full text-md font-semibold text-white py-1 px-2 rounded-md bg-green-500'>Initiate Transfer
      </button>
    </div>
  )
}

export default SendTo