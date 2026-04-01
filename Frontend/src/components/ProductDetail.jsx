import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const formatJPY = (v) => {
    try {
      return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(Number(v));
    } catch (e) {
      return '¥' + Number(v);
    }
  };

  const handleAdd = () => {
    if (!product) return;
    addToCart(product, Number(quantity));
    navigate('/cart');
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;
  if (!product) return <div className="text-center mt-10">Product not found</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src={product.imageURL} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
        <div>
          <h1 className="text-3xl font-bold text-yellow-800 mb-2">{product.name}</h1>
          <p className="text-yellow-700 mb-4">{product.category}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-yellow-600 mb-6">{formatJPY(product.price)}</p>

          <div className="flex items-center space-x-3 mb-6">
            <label className="font-semibold">Quantity:</label>
            <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-24 p-2 border rounded" />
          </div>

          <div className="flex space-x-4">
            <button onClick={handleAdd} className="bg-gradient-to-t from-yellow-600 to-yellow-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition font-semibold">Add To Cart</button>
            <button onClick={() => navigate(-1)} className="px-6 py-3 rounded-xl border border-yellow-600 text-yellow-800 font-semibold">Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
