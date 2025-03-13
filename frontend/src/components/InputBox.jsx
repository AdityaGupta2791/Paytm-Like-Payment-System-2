import React from 'react';

const InputBox = ({ label, type, placeholder, onChangeHandler }) => {
  return (
    <div className='w-full'>
      <div className='mx-2 mb-3'>
        <label className='block mb-1' htmlFor={label}>
          {label}
        </label>
        <input
          className='w-full py-1 px-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
          id={label}
          type={type}
          placeholder={placeholder}
          required
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
};

export default InputBox;
