import React from 'react'
import { Link } from "react-router-dom"

const BottomWarning = ({text, label, to}) => {
  return (
    <div className='text-center pb-4'>
      {text} <Link to={to} className='underline'>{label}</Link>
    </div>
  )
}

export default BottomWarning