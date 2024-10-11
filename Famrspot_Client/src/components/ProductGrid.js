import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Add to Cart function
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000); // Hide popup after 2 seconds
  };

  // Remove item from cart
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Handle checkout form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  // Mock payment processing
  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate a successful payment
    setPaymentSuccess(true);
    // Clear cart after "payment"
    setCart([]);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <img src={`http://localhost:5000${product.mainImage}`} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-1">ID: {product.id}</p>
                <p className="text-gray-600 text-sm mb-1">Price: Rs.{product.price}</p>
                <p className="text-gray-600 text-sm mb-1">Category: {product.category}</p>
                <p className="text-gray-600 text-sm">Stock: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                <button
                  className="mt-2 bg-green-500 text-white py-1 px-3 rounded"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
                <Link to={`/product/${product.id}`}>
                  <button className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">View Details</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {/* Cart Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {cart.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm">Price: Rs.{item.price}</p>
                  <p className="text-gray-600 text-sm">Category: {item.category}</p>
                  <p className="text-gray-600 text-sm">Stock: {item.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                </div>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Checkout Section */}
        {cart.length > 0 && (
          <div className="mt-8">
            <button
              className="bg-yellow-500 text-white py-2 px-4 rounded"
              onClick={() => setShowCheckout(true)}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Checkout Form */}
      {showCheckout && cart.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
          <form onSubmit={handlePayment} className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Card Holder Name</label>
              <input
                type="text"
                name="cardHolder"
                value={paymentInfo.cardHolder}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={paymentInfo.expiryDate}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">CVV</label>
              <input
                type="text"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
              Pay Now
            </button>
          </form>

          {/* Payment Success Message */}
          {paymentSuccess && (
            <div className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
              Payment successful! Thank you for your purchase.
            </div>
          )}
        </div>
      )}

      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
          Product added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
