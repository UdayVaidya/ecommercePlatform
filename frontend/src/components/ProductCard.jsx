import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="border p-4 rounded shadow hover:shadow-lg">
    <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
    <h3 className="font-bold">{product.name}</h3>
    <p>${product.price}</p>
    <Link to={`/product/${product._id}`} className="text-blue-500">View Details</Link>
  </div>
);

export default ProductCard;
