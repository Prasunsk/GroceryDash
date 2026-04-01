import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  useEffect(() => {
    const fetchAndRequestRecommendations = async () => {
      try {
        // Get full product list from API
        const productsRes = await axios.get('http://localhost:5000/api/products');
        const allProducts = productsRes.data || [];

        // Get user orders if logged in (to include order history)
        let orders = [];
        if (token) {
          try {
            const ordersRes = await axios.get('http://localhost:5000/api/orders/user/list', {
              headers: { 'x-auth-token': token }
            });
            orders = ordersRes.data || [];
          } catch (e) {
            console.warn('Could not fetch user orders, continuing without order history');
          }
        }

        // Call the new POST /api/recommendations with inventory + history
        const recRes = await axios.post(
          'http://localhost:5000/api/recommendations',
          { products: allProducts, orderHistory: orders },
          { headers: token ? { 'x-auth-token': token } : {} }
        );

        setRecommendations(recRes.data.recommendations || []);
      } catch (err) {
        console.error('Failed to fetch recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndRequestRecommendations();
  }, [token]);

  if (loading) return <div className="text-center">Loading recommendations...</div>;
  if (recommendations.length === 0) return null;
  const formatJPY = (v) => {
    try {
      return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(Number(v));
    } catch (e) {
      return '¥' + Number(v);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-yellow-800 mb-6">Suggested For You</h2>
      <div className="space-y-4">
        {recommendations.slice(0,3).map((product) => (
          <div
            key={product._id}
            className="bg-white bg-opacity-90 rounded-xl shadow-lg border border-yellow-600 p-4 hover:shadow-xl transition duration-300"
          >
            <img
              src={product.imageURL}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold text-yellow-800">{product.name}</h3>
            <p className="text-sm text-yellow-700 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-yellow-600">{formatJPY(product.price)}</p>
            <p className="text-xs text-yellow-600 mt-1">AI Recommended</p>
          </div>
        ))}
      </div>
    </div>
  );
}
