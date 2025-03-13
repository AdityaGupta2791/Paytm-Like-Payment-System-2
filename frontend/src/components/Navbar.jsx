import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Navbar = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  return (
    <nav className='flex items-center justify-between px-10 py-5 shadow-lg'>
      <h1 className='text-3xl font-bold'>Payment App</h1>
      <div className='flex items-center gap-3'>
        <p className='text-xl font-normal'>Hello, User</p>
        <div className='flex justify-center h-[40px] w-[40px] rounded-full bg-gray-300'>
          <div className='flex flex-col justify-center'>{name[0].toUpperCase()}</div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar