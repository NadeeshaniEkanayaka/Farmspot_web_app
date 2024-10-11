import React, { useState, useEffect } from "react";
import axios from "axios";
import SellerProductCard from "./SellerProductCard";

const SellerProductGrid = () => {
  const [products, setProducts] = useState([]);

  const uid = sessionStorage.getItem("uid");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/uid/${uid}`
      );
      setProducts(response.data);
      console.log(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const url = `http://localhost:5000/api/products/delete/${id}`;
      await axios.delete(url);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">
        Seller Product List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {products.map((product) => (
          <SellerProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default SellerProductGrid;
