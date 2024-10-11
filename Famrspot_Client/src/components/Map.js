// src/Map.js

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlbWl5YTQyMCIsImEiOiJjbHRvMmE3cGkwYWNpMml0MGw5ajduYnBjIn0.8yBr5VmfJYMR6QwtkLpiig';

const Map = () => {
  const mapContainerRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  // Function to calculate the distance between two lat/lng points
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRadians = (deg) => deg * (Math.PI / 180);
    const earthRadius = 6371; // Radius of the Earth in km

    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c; // Distance in km
  };

  // Function to get user location and update it
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          // Fetch nearby products after getting the user's location
          fetchLocations(latitude, longitude);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // Fetch locations and initialize map
  const fetchLocations = async (lat, lng) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      const filteredLocations = response.data.filter((location) =>
        calculateDistance(lat, lng, location.product_lat, location.product_lng) <= 15
      );
      setLocations(filteredLocations);
      initializeMap(lat, lng);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  // Initialize map with user location
  const initializeMap = (lat, lng) => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat], // Center map on user location
      zoom: 12
    });

    map.on('load', () => {
      // Add markers for each location
      locations.forEach((location) => {
        new mapboxgl.Marker()
          .setLngLat([location.product_lng, location.product_lat])
          .setPopup(new mapboxgl.Popup().setText(location.name))
          .addTo(map);
      });
    });
  };



  return (
    <div className="w-full h-screen">
      <button
        className="p-2 bg-green-500 text-white rounded m-2"
        onClick={getUserLocation}
      >
        Get My Location
      </button>
      <div className="w-full h-full" ref={mapContainerRef}></div>
    </div>
  );
};

export default Map;
