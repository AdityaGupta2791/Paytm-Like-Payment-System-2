import React from 'react';

const InputBox = ({ label, type, placeholder, onChangeHandler, error, value, name }) => {
  const id = name || label;
  return (
    <div className='w-full'>
      <div className='mx-2 mb-3'>
        <label className='block mb-1' htmlFor={id}>
          {label}
        </label>
        <input
          className={`w-full py-1 px-2 border-2 rounded-md focus:outline-none focus:ring ${error ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-300'}`}
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          required
          onChange={onChangeHandler}
          value={value}
        />
        {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      </div>
    </div>
  );
};

export default InputBox;
