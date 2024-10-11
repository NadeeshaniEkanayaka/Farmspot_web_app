import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className='min-h-screen px-8 py-12'>
        {/* About Us Section */}
        <h1 className='text-3xl font-bold mb-6'>About FarmSpot</h1>
        <p className='text-lg mb-4'>
          <strong>FarmSpot</strong> is a platform designed to connect local farmers directly with consumers, providing a streamlined marketplace where fresh produce is easily accessible. 
          Our mission is to empower farmers by giving them greater control over their sales and enabling consumers to access fresh, locally-sourced produce at fair prices.
        </p>
        <p className='text-lg mb-8'>
          With <strong>FarmSpot</strong>, we eliminate middlemen, ensuring farmers receive a higher profit margin while consumers benefit from lower prices. Our system also includes real-time updates, communication tools, and a user-friendly interface that allows for easy transactions.
        </p>

        {/* Help Section */}
        <h2 className='text-2xl font-bold mb-4'>How FarmSpot Helps</h2>
        <p className='text-lg mb-4'>
          <strong>FarmSpot</strong> helps both farmers and buyers by offering the following features:
        </p>
        <ul className='list-disc list-inside mb-6'>
          <li>Direct communication between farmers and buyers through an integrated messaging system.</li>
          <li>Real-time tracking of product availability, ensuring buyers can access fresh produce anytime.</li>
          <li>Eliminates middlemen, allowing farmers to earn more and consumers to pay less for their goods.</li>
          <li>Search filters that help buyers find farmers based on location, product type, and price.</li>
          <li>Secure payment gateways that make transactions easy and reliable.</li>
        </ul>

        {/* Help Section - Need Help */}
        <h2 className='text-2xl font-bold mb-4'>Need Help with FarmSpot?</h2>
        <p className='text-lg mb-8'>
          If you need assistance with using <strong>FarmSpot</strong>, we’re here to support you! You can visit our <a href="/faq" className="text-blue-600 underline">FAQ</a> page for answers to common questions, or reach out through our <a href="/contact" className="text-blue-600 underline">Contact Us</a> page to speak with our support team.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
