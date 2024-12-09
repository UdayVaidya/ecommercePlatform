import React, { useEffect, useState } from 'react';
import { fetchOrderHistory } from '../utils/api';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrderHistory()
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-4 mt-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded">
              <h3 className="font-bold">Order #{order._id}</h3>
              <p>Items: {order.items.length}</p>
              <p>Total: ${order.total}</p>
              <p>Placed on: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
