import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { placeOrder } from '../utils/api';

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart);
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCheckout = () => {
    const orderDetails = {
      items: cart,
      address,
    };

    placeOrder(orderDetails)
      .then(() => setSuccess(true))
      .catch((err) => console.error(err));
  };

  if (success) {
    return <p>Your order has been placed successfully!</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Checkout</h1>
      <div className="mt-4">
        <label className="block mb-2">Shipping Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
