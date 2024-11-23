import React from 'react'
import { BsTwitterX } from 'react-icons/bs'
import { FaGithub } from 'react-icons/fa'
import { IoLogoInstagram } from 'react-icons/io5'

const Footer = () => {
  return (
    <footer className="font-aclonica dark:text-waikawa-300   py-6">
      <div className="container mx-auto flex flex-col items-center sm:flex-row sm:justify-between gap-4 px-4">
        {/* Follow Us Section */}
        <div className="text-center sm:text-left">
          <p className="font-bold text-md mb-2">Follow us</p>
          <div className="flex justify-center sm:justify-start gap-4 text-2xl">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition duration-300"
            >
              <IoLogoInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition duration-300"
            >
              <BsTwitterX />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 dark:hover:text-gray-100 transition duration-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="text-center sm:text-left">
          <p className="font-semibold">About Us</p>
          <p className="text-sm">
            LearnVerse is your go-to platform for quality learning experiences.
          </p>
        </div>

        <div className="text-center sm:text-left">
          <p className="font-semibold">Contact</p>
          <p className="text-sm">Email: support@learnverse.com</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
