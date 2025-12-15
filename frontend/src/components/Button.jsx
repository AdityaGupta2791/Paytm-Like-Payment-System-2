import React from 'react'

const Button = ({ label, onClickHandler, type = 'button', disabled = false, loading = false }) => {
  return (
    <button
      type={type}
      onClick={onClickHandler}
      disabled={disabled}
      aria-busy={loading}
      className={`text-white ${disabled ? 'bg-gray-400' : 'bg-black'} my-3 py-[8px] px-[115px] rounded-md`}
    >
      {loading ? 'Loading...' : label}
    </button>
  )
}

export default Button