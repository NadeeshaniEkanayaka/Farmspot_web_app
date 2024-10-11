import React from 'react'
import Slider from 'react-slick';

const Hero = () => {

//Configuration for the carousal
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
   
        <Slider {...settings}>
      <div className=''>
        <img className='w-screen h-[500px] object-cover' src='https://plus.unsplash.com/premium_photo-1686156706293-890df6ca33c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
        <div className='p-10 mt-[-200px] text-white'>
            <h1>
                Share your Products
            </h1>
            <p>A safe place for farmers to share ther harvest
                without middlemen, Share your fresh haverst with
                rest of the world.
            </p>
            <button>
                Click to Know More..
            </button>
        </div>
      </div>
      <div className=''>
        <img className='w-screen h-[500px] object-cover' src='https://images.unsplash.com/photo-1458917524587-d3236cc8c2c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
        <div className='p-10 mt-[-200px] text-white'>
            <h1>
                Share your Products
            </h1>
            <p>A safe place for farmers to share ther harvest
                without middlemen, Share your fresh haverst with
                rest of the world.
            </p>
            <button>
                Click to Know More..
            </button>
        </div>
      </div>
      <div className=''>
        <img className='w-screen h-[500px] object-cover' src='https://images.unsplash.com/photo-1591189863430-ab87e120f312?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
        <div className='p-10 mt-[-200px] text-white'>
            <h1>
                Share your Products
            </h1>
            <p>A safe place for farmers to share ther harvest
                without middlemen, Share your fresh haverst with
                rest of the world.
            </p>
            <button>
                Click to Know More..
            </button>
        </div>
      </div>
      <div className=''>
        <img className='w-screen h-[500px] object-cover' src='https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
        <div className='p-10 mt-[-200px] text-white'>
            <h1>
                Share your Products
            </h1>
            <p>A safe place for farmers to share ther harvest
                without middlemen, Share your fresh haverst with
                rest of the world.
            </p>
            <button>
                Click to Know More..
            </button>
        </div>
      </div>
    </Slider>
  )
}

export default Hero