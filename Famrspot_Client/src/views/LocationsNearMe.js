import React from 'react';
import Map from '../components/Map';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const LocationsNearMe = () => {
  return (

    <>

      <Navbar/>

      <div className='mt-[100px]'>
        <h1>Locations Map</h1>
        <Map />
      </div>

      <Footer/>

    </>


  );
};

export default LocationsNearMe;