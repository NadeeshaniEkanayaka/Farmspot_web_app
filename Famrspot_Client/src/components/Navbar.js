import React from 'react'

//Icon Imports 
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className='top-0 fixed z-20 w-screen  h-[70px] px-2 py-2'>
        <div className='bg-green-500 h-[70px] rounded-[20px] px-2 border-green-400 border-4 flex flex-row items-center justify-between'>
            <div>
            <span className='text-white text-2xl uppercase font-extrabold'><a href='/'>Farmspot</a></span>
            </div>
            
            <div className='flex flex-row justify-between md:gap-6 lg:gap-20 text-white font-bold'>
            <a href='/'>Home</a>
                <a href='/contact-us'>Contact US</a>
                <a href='/near-me'>Items Near Me</a>
                <a href='/about-us'>Help</a>
                
            </div>
            <div className='flex flex-row items-center gap-6'>
                <FaShoppingCart className='text-white text-xl cursor-pointer'/>
                <div className='cursor-pointer'>
                    <img className='rounded-full' src='https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg' height={'50px'} width={'50px'}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar