import React from 'react'
import Heading from '../components/Heading'
import SendTo from '../components/SendTo'

const SendMoney = () => {
  return (
    <div className='flex items-center justify-center bg-[#f2f2f2] h-screen'>
      <div className='py-8 w-[300px] md:w-[450px] bg-white rounded-md'>
        <Heading label={"Send Money"} />
        <SendTo />
      </div>
    </div>
  )
}

export default SendMoney