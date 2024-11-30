import React from 'react';
import { BsTwitterX } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { IoLogoInstagram } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="mt-10 dark:text-waikawa-300 py-6">
      <div className="relative mb-10 w-full h-[1px] dark:bg-waikawa-600 light:text-waikawa-950"></div>
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-10 px-4">
        <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
          <p className="font-bold text-md mb-2">Follow us</p>
          <div className="flex gap-4 text-2xl">
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
              className="hover:text-black transition duration-200"
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


        <div className="text-center flex flex-col gap-3 pl-20">
          <p className="text-2xl font-aclonica">LearnVerse</p>
          <p className="font-semibold">About Us</p>
          <p className="text-sm">
            LearnVerse is your go-to platform for quality learning experiences.
          </p>
        </div>


        <div className="text-center sm:text-right flex flex-col items-center sm:items-end">
          <p className="font-semibold mb-2">Contact</p>
          <p className="text-sm">Email: me.susheelrai@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
