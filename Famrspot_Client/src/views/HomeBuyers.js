import React, { useEffect } from 'react'

//Component Imports
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import Footer from '../components/Footer'

//React Router Imports
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      navigate('/sign-in');
    }
  }, [navigate]);
  

  return (
    <>
    <div className='w-screen h-screen'>
      <Navbar/>
      <div className='px-2 mt-[100px]'>
        <Hero/>
        <div className='mt-10 flex flex-row justify-center'>
          <h1 className='uppercase font-extrabold text-4xl '>
            Products
          </h1>
        </div>
        <ProductGrid/>
      </div>
      <Footer/>
    </div>
    </>
  )
}

export default Home