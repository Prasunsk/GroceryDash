import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Recommendations from './Recommendations';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  'All',
  'Dairy',
  'Meat',
  'Grains',
  'Spices',
  'Vegetables',
  'Fruits',
  'Beverages',
  'Snacks'
];

export default function HomePage() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

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

  if (loading) return <div className="text-center mt-10 text-xl">Loading products...</div>;
  if (error) return <div className="text-center mt-10 text-red-600 text-xl">{error}</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Categories */}
      <div className="w-48 bg-white border-r border-yellow-600 shadow-lg p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-yellow-800 mb-6">Categories</h2>
        <nav className="space-y-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                selectedCategory === category
                  ? 'bg-gradient-to-t from-yellow-600 to-yellow-800 text-white shadow-lg'
                  : 'text-yellow-800 hover:bg-yellow-50 border border-yellow-200'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>

      {/* Center - Products */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-yellow-800 mb-2">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h1>
          <p className="text-yellow-700 mb-8">
            {filteredProducts.length} products available
          </p>

          {filteredProducts.length === 0 ? (
            <div className="text-center text-yellow-700 text-lg">
              No products found in this category
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`} className="group">
                  <div
                    className="bg-white rounded-xl shadow-lg border border-yellow-600 p-4 hover:shadow-xl transition duration-300 flex flex-col h-full"
                  >
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-xl font-semibold text-yellow-800 mb-2">{product.name}</h2>
                    <p className="text-sm text-yellow-700 mb-2">{product.category}</p>
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-3 flex-grow">{product.description}</p>
                    )}
                    <p className="text-lg font-bold text-yellow-600 mb-4">
                      {formatJPY(product.price)}
                    </p>
                    <div className="w-full">
                      <button
                        onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                        className="w-full bg-gradient-to-t from-yellow-600 to-yellow-800 text-white py-2 rounded-xl shadow-lg hover:shadow-xl transition duration-300 font-semibold"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Recommendations */}
      <div className="w-80 bg-white border-l border-yellow-600 shadow-lg p-6 overflow-y-auto">
        <div className="sticky top-0">
          <h2 className="text-2xl font-bold text-yellow-800 mb-6">Suggested For You</h2>
          {user ? (
            <Recommendations />
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-800 font-semibold mb-3">Sign in to see personalized recommendations</p>
              <p className="text-sm text-yellow-700">
                Get AI-powered product suggestions based on your preferences
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
