import React from 'react';
import image from '../assets/Images/image.png';
import MainButton from './landing/MainButton';
import { useRecoilState } from 'recoil';
import { emailAtom, passwordAtom, usernameAtom } from '../store/atoms/input';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash, FaRegUser } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { PiPassword } from 'react-icons/pi';
import { isPassAtom } from '../store/atoms/passText';
import {loadingAtom, errorAtom} from '../store/atoms/errorAndLoading'
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';


const Signup = () => {
    const [username, setUsername] = useRecoilState(usernameAtom)
    const [password, setPassword] = useRecoilState(passwordAtom)
    const [email, setEmail] = useRecoilState(emailAtom)
    const [isPassword, setIsPassword] = useRecoilState
    (isPassAtom)
    const [loading, setLoading] = useRecoilState(loadingAtom)
    const [error, setError] = useRecoilState(errorAtom)
    const navigate = useNavigate()


    const handleSignup = async(e)=>{
        e.preventDefault()
        try{
            setLoading(true)
            const response = await axios.post("https://learnverse-ib6o.onrender.com/api/user/signup", {
                username,https://learnverse-ib6o.onrender.com/
                email,
                password,
            })
            console.log(response.data)
            if(response.data.token){
                setLoading(false)
                enqueueSnackbar("User signed up successfully!", {variant:"success"})
                localStorage.setItem("token", response.data.token)
            }
            navigate('/signin')
        }catch(err){
            setLoading(false)
            setError(err.message)
        }
    }

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
        <p className='font-poppins text-sm sm:text-md lg:text-[1rem]  justify-end text-waikawa-200 absolute top-4 right-4'>
            Already have an account?<button
            onClick={()=>navigate('/signin')}
            className='text-red-500  font-aclonica '>Signin</button>
        </p>
        <form>
            <div className='flex flex-col items-center gap-5'>
                <div className='flex gap-3 lg:gap-6'>
                    <FaRegUser className='text-waikawa-300 mt-1.5' />
                    <input
                    type='text'
                    value={username}
                    placeholder='Sus Kyle'
                    onChange={(e)=> setUsername(e.target.value)}
                    className='p-1 border border-1 text-waikawa-200 border-waikawa-950 focus:outline-none focus:border-purple-800 pl-2 rounded-lg bg-input-color lg:font-poppins'
                     />
                </div>
                <div className='flex gap-3 lg:gap-6'>
                <HiOutlineMail  className='text-waikawa-300 mt-1.5' />
                <input
                    type='email'
                    value={email}
                    placeholder='sus@kyle.com'
                    onChange={(e)=> setEmail(e.target.value)}
                    className='p-1 border border-1 text-waikawa-200 border-waikawa-950 focus:outline-none focus:border-purple-800 pl-2 rounded-lg bg-input-color lg:font-poppins'
                     />
                </div>
                <div className='flex gap-3 lg:gap-6 relative'>
                    <PiPassword  className='text-waikawa-300 mt-1.5' />
                <input
                    type={isPassword?'password':'text'}
                    value={password}
                    placeholder='12rjsof5nksf'
                    onChange={(e)=> setPassword(e.target.value)}
                    className='p-1 border border-1 text-waikawa-200 border-waikawa-950 focus:outline-none lg:font-poppins focus:border-purple-800 pl-2 rounded-lg bg-input-color overflow-hidden '
                     />
                     {
                        isPassword?
                     <FaRegEyeSlash
                     onClick={()=>setIsPassword(!isPassword)}
                     className='absolute top-2 left-48 lg:left-56 text-waikawa-300' />
                     : <FaRegEye
                        onClick={()=>setIsPassword(!isPassword)}
                        className='absolute top-2 left-48 lg:left-56 text-waikawa-300'
                      />
                     }
                </div>
                <button
                onClick={handleSignup}
                className='dark:bg-waikawa-100
                hover:dark:bg-waikawa-950 hover:dark:text-waikawa-100
                transition-all duration-300
                px-6 lg:px-10 font-poppins
                dark:text-waikawa-950 p-1 rounded-xl'
            >
                {loading? "Signing up...": "Signup"}
            </button>
                {
                    error && <p>{error}</p>
                }
            </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
