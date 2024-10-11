import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlbWl5YTQyMCIsImEiOiJjbHRvMmE3cGkwYWNpMml0MGw5ajduYnBjIn0.8yBr5VmfJYMR6QwtkLpiig';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const productData = response.data[0];
        setProduct(productData);
        console.log(product.product_lat + product.product_lng)
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: userLocation
          ? [userLocation.lng, userLocation.lat]
          : [79.9556, 6.9271], // Default to Sri Lanka coordinates
        zoom: 5
      });

      if (userLocation) {
        new mapboxgl.Marker({ color: 'blue' })
          .setLngLat([userLocation.lng, userLocation.lat])
          .setPopup(new mapboxgl.Popup().setHTML('<h3>You are here</h3>'))
          .addTo(map);
      }

      if (product.product_lat && product.product_lng) {
        new mapboxgl.Marker({ color: 'red' })
          .setLngLat([product.product_lng, product.product_lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${product.name}</h3>`))
          .addTo(map);

        if (userLocation) {
          map.on('load', () => {
            map.addSource('route', {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'LineString',
                      coordinates: [
                        [userLocation.lng, userLocation.lat],
                        [product.product_lng, product.product_lat]
                      ]
                    }
                  }
                ]
              }
            });

            map.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#888',
                'line-width': 6
              }
            });
          });
        }
      }

      return () => map.remove();
    }
  }, [product, userLocation]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 mt-[100px]">
        {product && (
          <>
            <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-2">Price: Rs.{product.price}/Per kilo</p>
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-gray-600 mb-4">Description: {product.description}</p>
            <p>user5@gmail.com</p>

            <button
              onClick={getUserLocation}
              className="mb-4 bg-green-500 text-white py-2 px-4 rounded"
            >
              Get User Location
            </button>

            <div id="map" style={{ height: "700px", width: "100%" }}></div>
          </>
        )}
      </div>

      <Footer/>
    </>

  );
};

export default ProductDetails;
