import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function UserProfile() {
  const { token } = useAuth();
  const [tab, setTab] = useState('info');
  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const [uRes, oRes] = await Promise.all([
          axios.get('http://localhost:5000/api/users/me', { headers: { 'x-auth-token': token } }),
          axios.get('http://localhost:5000/api/orders/user/list', { headers: { 'x-auth-token': token } })
        ]);
        setUserInfo(uRes.data);
        setOrders(oRes.data.orders || []);
        setError(null);
      } catch (err) {
        console.error('Failed to load profile data', err);
        setError(err.response?.data?.msg || err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (!token) return <div className="p-8 text-yellow-800">Please sign in to view your profile.</div>;
  if (loading) return <div className="p-8 text-yellow-800">Loading...</div>;
  if (error) return <div className="p-8 text-red-600 font-semibold">Error: {error}</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-yellow-800">Your Profile</h1>
        <div className="space-x-2">
          <button onClick={() => setTab('info')} className={`px-4 py-2 rounded ${tab==='info' ? 'bg-yellow-600 text-white' : 'border'}`}>Info</button>
          <button onClick={() => setTab('orders')} className={`px-4 py-2 rounded ${tab==='orders' ? 'bg-yellow-600 text-white' : 'border'}`}>Orders</button>
        </div>
      </div>

      {tab === 'info' && (
        <div className="bg-white p-6 rounded shadow border border-yellow-200">
          <p className="text-yellow-800"><strong>Username:</strong> {userInfo && userInfo.name}</p>
          <p className="text-yellow-800"><strong>Email:</strong> {userInfo && userInfo.email}</p>
        </div>
      )}

      {tab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-yellow-700">No past orders found.</div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-white p-4 rounded shadow border border-yellow-200">
                <div className="flex justify-between mb-2">
                  <div className="font-semibold">Order: {order.orderId || order._id}</div>
                  <div className="text-sm text-yellow-700">Status: {order.status}</div>
                </div>
                <div className="text-sm text-gray-700 mb-2">Total: {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(order.totalAmount)}</div>
                <div>
                  {order.items.map((it) => (
                    <div key={it.productId} className="text-sm">{it.quantity} x {it.name}</div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
