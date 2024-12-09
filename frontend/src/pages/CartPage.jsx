import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCart, removeFromCart } from '../redux/cartSlice';
import { fetchCart } from '../utils/api';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCart()
      .then((res) => setCart(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    setCart(cart.filter((item) => item._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid gap-4 mt-4">
          {cart.map((item) => (
            <div key={item._id} className="border p-4 rounded">
              <h3 className="font-bold">{item.name}</h3>
              <p>Price: ${item.price}</p>
              <button
                onClick={() => handleRemove(item._id)}
                className="text-red-500 mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
