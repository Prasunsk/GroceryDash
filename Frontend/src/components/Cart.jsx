import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Cart() {
  const { cart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [checkoutStatus, setCheckoutStatus] = useState(null);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!token) {
      alert('Please log in to checkout');
      return;
    }

    try {
      const userCoordinates = { x: 0, y: 0 };
      const res = await axios.post('http://localhost:5000/api/orders/checkout', {
        items: cart,
        userCoordinates
      }, {
        headers: { 'x-auth-token': token }
      });
      
      // Only clear cart on successful response
      if (res.status === 200 && res.data.orderId) {
        setCheckoutStatus(`✓ Order Placed! Order ID: ${res.data.orderId}`);
        clearCart();
        // Redirect to order tracking after 2 seconds
        setTimeout(() => {
          navigate(`/tracking/${res.data.orderId}`);
        }, 2000);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      const errorMsg = err.response?.data?.msg || err.message || 'Checkout failed';
      setCheckoutStatus(`Error: ${errorMsg}`);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-800">Your Cart</h1>
      
      {/* Always show status message at the top if it exists */}
      {checkoutStatus && (
        <div className="mb-6 p-4 bg-green-100 border border-green-600 rounded-lg text-center">
          <p className="text-green-800 font-semibold">{checkoutStatus}</p>
        </div>
      )}

      {cart.length === 0 ? (
        <p className="text-center text-yellow-700">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="bg-white bg-opacity-90 rounded-xl shadow-lg border border-yellow-600 p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-yellow-800">{item.name}</h2>
                    <p className="text-yellow-700 text-sm mb-2">{item.category}</p>
                    <p className="text-yellow-600 font-bold">{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(item.price * item.quantity)}</p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 bg-yellow-50 border border-yellow-300 rounded-lg p-2 mx-4">
                    <button
                      onClick={() => decrementQuantity(item._id)}
                      className="bg-red-600 text-white w-8 h-8 rounded-lg hover:bg-red-700 transition font-bold"
                    >
                      −
                    </button>
                    <span className="text-yellow-800 font-semibold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item._id)}
                      className="bg-green-600 text-white w-8 h-8 rounded-lg hover:bg-green-700 transition font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl hover:bg-red-700 transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-2xl font-bold text-yellow-800">Total: {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(totalPrice)}</p>
            <div className="space-x-4 mt-4">
              <button
                onClick={clearCart}
                className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300 font-semibold"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300 font-semibold"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}