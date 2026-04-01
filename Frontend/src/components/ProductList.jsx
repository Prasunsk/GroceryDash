import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    console.log('Added to cart:', product.name);
  };

  const formatJPY = (v) => {
    try {
      return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(Number(v));
    } catch (e) {
      return '¥' + Number(v);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading products...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-800">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white bg-opacity-90 rounded-xl shadow-lg border border-yellow-600 p-4 hover:shadow-xl transition duration-300">
            <img src={product.imageURL} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">{product.name}</h2>
            <p className="text-yellow-700 mb-1">{product.category}</p>
            <p className="text-lg font-bold text-yellow-600 mb-4">{formatJPY(product.price)}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-gradient-to-t from-yellow-600 to-yellow-800 text-white py-2 rounded-xl shadow-lg hover:shadow-xl transition duration-300 font-semibold"
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
