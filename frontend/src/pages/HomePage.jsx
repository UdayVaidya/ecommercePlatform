import { useEffect, useState } from 'react';
import { fetchProducts } from '../utils/api';
import { Button } from '@mui/material';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
          <Button variant="contained" color="primary">
            Click Me
          </Button>
      <h1>Product List</h1>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;

