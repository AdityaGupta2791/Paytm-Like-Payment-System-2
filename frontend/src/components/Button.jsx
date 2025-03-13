import React from 'react'

const Button = ({label, onClickHandler}) => {
  return (
    <button 
      onClick={onClickHandler}
      className='text-white bg-black my-3 py-[8px] px-[115px] rounded-md'>
      {label}
    </button>
  )
}

export default Button