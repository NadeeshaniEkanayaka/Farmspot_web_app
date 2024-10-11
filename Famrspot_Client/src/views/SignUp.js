import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Buyer');

  useEffect(() => {
    console.log(role);
  }, [role])
  

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password,
        role
      });
      console.log('Login successful:', response.data);
      alert('Signup Successful !');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="relative py-3 sm:max-w-xs sm:mx-auto">
        <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white rounded-xl shadow-lg">
          <div className="flex flex-col justify-center items-center h-full select-none">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <a href="https://amethgalarcio.web.app/" target="_blank" rel="noopener noreferrer">
                <img src="https://www.svgrepo.com/download/302839/sign-up-application.svg" className="w-20" alt="Logo" />
              </a>
              <p className="m-0 text-[16px] font-semibold dark:text-white">Login to your Account</p>
              <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
                Get started with our app, just start section and enjoy experience.
              </span>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">Username</label>
              <input
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">Email</label>
              <input
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">Password</label>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">Role</label>
              <select
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
                
              </select>
            </div>
            <div className="mt-5">
              <button
                className="py-1 px-8 bg-green-500 hover:bg-green-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
                onClick={handleSignUp}
              >
                SignUp
              </button>
              <p className='text-gray-400 text-sm mt-5'>Already Registered ? <a href='/sign-in'><span className='text-blue-300'>SignIn Here...</span></a></p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
