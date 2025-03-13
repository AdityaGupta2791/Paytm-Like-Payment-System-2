import React from 'react'

const BottomWarning = ({text, label, to}) => {
  return (
    <div className='text-center pb-4'>
      {text} <a href={to} className='underline'>{label}</a>
    </div>
  )
}

export default BottomWarning