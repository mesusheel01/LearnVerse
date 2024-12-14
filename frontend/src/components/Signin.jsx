import React, { useEffect } from 'react';
import image from '../assets/Images/image.png';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { passwordAtom, usernameAtom } from '../store/atoms/input';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash, FaRegUser } from 'react-icons/fa';
import { PiPassword } from 'react-icons/pi';
import { isPassAtom } from '../store/atoms/passText';
import { errorAtom, loadingAtom } from '../store/atoms/errorAndLoading';
import axios from 'axios';
import { tokenAtom } from '../store/atoms/tokenCheck';
import { useSnackbar } from 'notistack';

const Signin = () => {
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [isPassword, setIsPassword] = useRecoilState(isPassAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [error, setError] = useRecoilState(errorAtom);
  const navigate = useNavigate();
  const setToken = useSetRecoilState(tokenAtom);
  const {enqueueSnackbar} = useSnackbar()

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/user/signin", {
        username,
        password,
      });

      if (response.data.token) {
        setToken(response.data.token);
        enqueueSnackbar("User Sign In successfully!", {variant:"success"})
        localStorage.setItem("token", response.data.token);
        console.log(response.data.token)
        navigate('/home');
    }
      }
     catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="grid grid-rows-[1fr_2fr] md:grid-cols-2 md:grid-rows-1 h-screen dark:bg-bunker-950">
      <div className="dark:bg-waikawa-950 flex flex-col gap-10 m-3 rounded-xl items-center">
        <div className="translate-y-2 md:translate-y-28 lg:translate-y-16 w-[12rem] md:w-[20rem] lg:w-[25rem] ">
          <img src={image} alt="Book image" />
        </div>
        <p className="dark:text-waikawa-200 md:translate-y-64 lg:translate-y-48 sm:block hidden font-aclonica text-md sm:text-lg lg:text-xl xl:text-2xl">
          Welcome to the Skill Uplifting Era!
        </p>
      </div>

      <div className="p-4 flex relative items-center justify-center">
        <form>
          <div className='flex flex-col items-center gap-5'>
            <div className='flex gap-3 lg:gap-6'>
              <FaRegUser className='text-waikawa-300 mt-1.5' />
              <input
                type='text'
                value={username}
                placeholder='Sus Kyle'
                onChange={(e) => setUsername(e.target.value)}
                className='p-1 border border-1 text-white border-waikawa-950 focus:outline-none focus:border-purple-800 pl-2 rounded-lg bg-input-color lg:font-poppins'
              />
            </div>
            <div className='flex gap-3 lg:gap-6 relative'>
              <PiPassword className='text-waikawa-300 mt-1.5' />
              <input
                type={isPassword ? "password" : 'text'}
                value={password}
                placeholder='12rjsof5nksf'
                onChange={(e) => setPassword(e.target.value)}
                className='p-1 border border-1 text-white border-waikawa-950 focus:outline-none lg:font-poppins focus:border-purple-800 pl-2 rounded-lg bg-input-color'
              />
              {isPassword ? (
                <FaRegEyeSlash
                  onClick={() => setIsPassword(!isPassword)}
                  className='absolute top-2 left-48 lg:left-56 text-waikawa-300'
                />
              ) : (
                <FaRegEye
                  onClick={() => setIsPassword(!isPassword)}
                  className='absolute top-2 left-48 lg:left-56 text-waikawa-300'
                />
              )}
            </div>
            <button
              onClick={handleSignin}
              className='dark:bg-waikawa-100
              hover:dark:bg-waikawa-950 hover:dark:text-waikawa-100
              transition-all duration-300
              px-6 lg:px-10 font-poppins
              dark:text-waikawa-950 p-1 rounded-xl'
            >
              {loading ? "Signin in..." : "Signin"}
            </button>
            {error && <p className='text-purple-400'>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
