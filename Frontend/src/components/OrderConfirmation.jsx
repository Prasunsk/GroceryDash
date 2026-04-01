import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Try to get orderId from location.state or query param ?id=
  const params = new URLSearchParams(location.search);
  const orderId = params.get('id') || (location.state && location.state.orderId);

  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/orders/${orderId}`, {
          headers: token ? { 'x-auth-token': token } : {},
        });
        if (!res.ok) throw new Error('Failed to fetch order');
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message || 'Error fetching order');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const goHome = () => navigate('/');

  if (!orderId) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">No order specified</h2>
        <p className="mb-4">We couldn't find an order to show. If you just placed an order, you may be redirected from the checkout page.</p>
        <button onClick={goHome} className="bg-yellow-600 text-white px-4 py-2 rounded">Continue shopping</button>
      </div>
    );
  }

  if (loading) return <div className="p-8">Loading order...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  const estimatedDelivery = order
    ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toLocaleDateString()
    : '';

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Order Confirmed</h2>
      {order ? (
        <>
          <p className="mb-2">Thank you — your order <strong>#{order.orderId || order._id}</strong> has been placed.</p>
          <p className="mb-4">Estimated delivery: <strong>{estimatedDelivery}</strong></p>

          <div className="bg-white shadow rounded p-4">
            <h3 className="font-semibold mb-2">Items</h3>
            <ul>
              {order.items && order.items.map((it) => (
                <li key={it.product} className="py-2 border-b last:border-b-0 flex items-center">
                  <img src={it.image} alt={it.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div className="flex-1">
                    <div className="font-semibold">{it.name}</div>
                    <div className="text-sm text-gray-600">Qty: {it.qty} · ¥{it.price}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right font-semibold">Total: ¥{order.total}</div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button onClick={goHome} className="bg-yellow-600 text-white px-4 py-2 rounded">Continue shopping</button>
          </div>
        </>
      ) : (
        <div>No order details available.</div>
      )}
    </div>
  );
}
// Define the order confirmation / tracking UI component here