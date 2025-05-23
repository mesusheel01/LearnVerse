import React from 'react'
import Button from './Button'
import { useRecoilState } from 'recoil'
import { darkAtom } from '../../store/atoms/darkMode'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [theme, setTheme] = useRecoilState(darkAtom)
    const navigate = useNavigate()
    
    const toggleTheme = () => {
        setTheme((theme) => {
            const newTheme = theme === 'dark' ? 'light' : 'dark'
            document.documentElement.classList.remove(theme)
            document.documentElement.classList.add(newTheme)
            return newTheme
        })
    }

    return (
        <>
        <nav className="flex justify-between items-center px-6 py-6 sm:px-10 md:px-14 lg:px-16 border-b border-waikawa-600 dark:bg-bunker-950 text-sm sm:text-base md:text-lg">
            {/* Logo */}
            <div className="text-lg sm:text-xl lg:text-2xl font-aclonica dark:text-waikawa-400"
            >
                LearnVerse
            </div>

            {/* Links and Buttons */}
            <div className="flex gap-3 font-aclonica text-[.7rem]  md:text-[.8rem] items-center">
                <button
                    onClick={()=>navigate('/courses')}
                    className="hidden sm:inline-block dark:text-waikawa-400  hover:dark:text-waikawa-600 transition duration-300"
                >
                    Courses
                </button>
                <Button title="Signup" routeTo="/signup" />
                <Button title="Signin" routeTo="/signin" />

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full dark:text-waikawa-400  hover:dark:text-waikawa-600 transition duration-300"
                >
                    {theme === 'dark' ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5" // Reduced size
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5" // Reduced size
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                            />
                        </svg>
                    )}
                </button>
            </div>
        </nav>

        </>
    )
}

export default Navbar
