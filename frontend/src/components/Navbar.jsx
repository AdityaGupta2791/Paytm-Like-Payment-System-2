import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [searchParams] = useSearchParams();
  const rawName = searchParams.get("name");
  const name = rawName && rawName.length > 0 ? rawName : 'User';
  const initial = name && name.length > 0 ? name[0].toUpperCase() : 'U';
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
    } catch (e) {/* Ignore errors */}
    navigate('/signin');
  }

  return (
    <nav className='flex items-center justify-between px-10 py-5 shadow-lg'>
      <h1 className='text-3xl font-bold'>Payment App</h1>
      <div className='flex items-center gap-3'>
        <p className='text-xl font-normal'>Hello, {name}</p>
        <div className='flex justify-center h-[40px] w-[40px] rounded-full bg-gray-300'>
          <div className='flex flex-col justify-center'>{initial}</div>
        </div>
        <button
          onClick={handleLogout}
          className='ml-4 px-3 py-1 rounded-md text-sm bg-red-500 text-white'
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar