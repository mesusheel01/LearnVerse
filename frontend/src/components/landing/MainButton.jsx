import React from 'react'
import { useNavigate } from 'react-router-dom'

const MainButton = (props) => {
    const {title, routeTo} = props
    const navigate = useNavigate()

  return (
    <div>
      <button
        onClick={()=>navigate(routeTo)}
        className='dark:bg-waikawa-100
        hover:dark:bg-waikawa-950 hover:dark:text-waikawa-100
        transition-all duration-300
        px-6
        dark:text-waikawa-950 p-2 rounded-xl'
      >
        {title}
      </button>
    </div>
  )
}

export default MainButton
