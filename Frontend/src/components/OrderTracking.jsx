import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function OrderTracking() {
  const { orderId } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusSteps = ['Pending', 'Picking', 'Out for Delivery', 'Delivered'];

  useEffect(() => {
    let intervalId;

    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
          headers: { 'x-auth-token': token }
        });
        setOrder(res.data);
        setLoading(false);

        // Stop polling once delivered
        if (res.data.status === 'Delivered') {
          clearInterval(intervalId);
        }
      } catch (err) {
        setError('Failed to fetch order');
        setLoading(false);
      }
    };

    // Fetch immediately
    fetchOrder();

    // Poll every 3 seconds
    intervalId = setInterval(fetchOrder, 3000);

    return () => clearInterval(intervalId);
  }, [orderId, token]);

  if (loading) return <div className="text-center mt-10">Loading order...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;
  if (!order) return <div className="text-center mt-10">Order not found</div>;

  const currentStatusIndex = statusSteps.indexOf(order.status);
  const distance = Math.sqrt(
    Math.pow(order.deliveryCoordinates.x, 2) +
    Math.pow(order.deliveryCoordinates.y, 2)
  );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-800">Order Tracking</h1>

      {/* Order Info Card */}
      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg border border-yellow-600 p-6 mb-8">
        <p className="text-yellow-700 mb-2">Order ID: <span className="font-mono">{order.orderId || order._id}</span></p>
        <p className="text-yellow-700 mb-2">Total Amount: <span className="font-bold">{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(order.totalAmount)}</span></p>
        <p className="text-yellow-700 mb-4">Estimated Delivery Time: <span className="font-bold">{order.estimatedDeliveryTime}s</span></p>
      </div>

      {/* Status Timeline */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-yellow-800 mb-6">Delivery Status</h2>
        <div className="flex justify-between items-center">
          {statusSteps.map((step, index) => (
            <div key={step} className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white mb-2 ${
                  index <= currentStatusIndex
                    ? 'bg-gradient-to-t from-yellow-600 to-yellow-800'
                    : 'bg-gray-400'
                }`}
              >
                {index + 1}
              </div>
              {/* Step Label */}
              <p className={`text-sm font-semibold ${index <= currentStatusIndex ? 'text-yellow-800' : 'text-gray-500'}`}>
                {step}
              </p>
              {/* Connector Line */}
              {index < statusSteps.length - 1 && (
                <div
                  className={`h-1 w-full mt-2 ${
                    index < currentStatusIndex ? 'bg-yellow-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Logistics Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg border border-yellow-600 p-6 text-center">
          <p className="text-yellow-700 mb-2">Distance Travelled</p>
          <p className="text-3xl font-bold text-yellow-800">{distance.toFixed(2)} Units</p>
        </div>
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg border border-yellow-600 p-6 text-center">
          <p className="text-yellow-700 mb-2">Total Delivery Time</p>
          <p className="text-3xl font-bold text-yellow-800">{order.estimatedDeliveryTime}s</p>
        </div>
      </div>

      {/* Items */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4">Order Items</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.productId} className="bg-white bg-opacity-90 rounded-xl shadow-lg border border-yellow-600 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800">{item.name}</h3>
                  <p className="text-yellow-700">Qty: {item.quantity}</p>
                </div>
                <p className="text-lg font-bold text-yellow-600">{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Message */}
      <div className="text-center">
        {order.status === 'Delivered' && (
          <p className="text-green-600 font-bold text-lg">✓ Order Delivered Successfully!</p>
        )}
        {order.status === 'Picking' && (
          <p className="text-yellow-600 font-bold text-lg">⏳ Order is being picked from warehouse...</p>
        )}
        {order.status === 'Pending' && (
          <p className="text-blue-600 font-bold text-lg">⌛ Order is being prepared...</p>
        )}
      </div>
    </div>
  );
}
