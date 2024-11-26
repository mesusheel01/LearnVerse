import React from 'react'
import { BsTwitterX } from 'react-icons/bs'
import { FaGithub } from 'react-icons/fa'
import { IoLogoInstagram } from 'react-icons/io5'

const Footer = () => {
  return (
    <footer className=" mt-10 font-aclonica dark:text-waikawa-300   py-6">
    <div className="relative mb-10 w-full h-[1px] dark:bg-waikawa-600 light:text-waikawa-950"></div>
      <div className="container text-sm md:text-lg mx-auto flex flex-col items-center sm:flex-row sm:justify-between gap-10">

        <div className="text-center sm:text-left">
          <p className="font-bold text-md mb-2">Follow us</p>
          <div className="flex justify-center sm:justify-start gap-4 text-2xl">
            <a
              href="https://www.instagram.com/me.susheel_01/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition duration-200"
            >
              <IoLogoInstagram />
            </a>
            <a
              href="https://x.com/SusheelRai58945"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition duration-200"
            >
              <BsTwitterX />
            </a>
            <a
              href="https://github.com/mesusheel01"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-950 dark:hover:text-gray-400 transition duration-200"
            >
              <FaGithub />
            </a>
          </div>
        </div>


        <div className="text-center flex flex-col items-center justify-center gap-4 mb-5 sm:text-left">
        <p className='text-2xl'>LearnVerse</p>
          <p className="font-semibold text-center ">About Us</p>
          <p className="text-sm">
            LearnVerse is your go-to platform for quality learning experiences.
          </p>
        </div>

        <div className="text-center  sm:text-left">
          <p className="font-semibold mb-2">Contact</p>
          <p className="text-sm">Email: me.susheelrai@gmail.com</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
