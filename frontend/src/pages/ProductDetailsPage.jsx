import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../utils/api';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails(id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <img src={product.image} alt={product.name} className="w-full max-h-80 object-cover mb-4" />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-lg">${product.price}</p>
      <p className="my-4">{product.description}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
    </div>
  );
};

export default ProductDetailsPage;
