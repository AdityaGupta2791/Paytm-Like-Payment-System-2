import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({user}) => {
  return (
    <div className='flex items-center justify-between mb-5'>
      <div className='flex justify-center items-center gap-2'>
        <div className='flex justify-center w-[40px] h-[40px] rounded-full bg-gray-300'>
          <div className='flex flex-col justify-center '>
            {user.firstName[0]}
          </div>
        </div>
        <p className='text-xl font-semibold'>{user.firstName +" "+ user.lastName}</p>
      </div>
      <Link to={`/send?id=${user._id}&name=${user.firstName}`}>
        <button className='bg-black text-white rounded-md py-1.5 px-3'>
          Send Money
        </button>
      </Link>
    </div>
  )
}

export default Users