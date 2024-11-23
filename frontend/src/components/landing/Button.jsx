import React from 'react'
import { useNavigate } from 'react-router-dom'

const Button = ({ title, routeTo }) => {
    const navigate = useNavigate()

    return (
        <div>
            <button
                onClick={() => navigate(routeTo)}
                className='
                    px-2
                    rounded-xl
                    dark:bg-waikawa-950
                    dark:text-waikawa-300
                    hover:dark:bg-waikawa-300
                    hover:dark:text-waikawa-950
                    transition-all duration-300 ease-in-out
                '>
                {title}
            </button>
        </div>
    )
}

export default Button
