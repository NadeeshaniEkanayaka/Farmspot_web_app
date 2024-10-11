import React from "react";

const SellerProductCard = ({ product, onDelete }) => {
  console.log(product.mainImage);

  return (
    <div className="border rounded-lg shadow-md p-4">
      <img
        src={`http://localhost:5000${product.mainImage}`}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-4">Seller: {product.name}</h2>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-gray-900 font-semibold mt-2">
        Price: Rs.{product.price}
      </p>
      <button
        onClick={() => onDelete(product.id)}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default SellerProductCard;
