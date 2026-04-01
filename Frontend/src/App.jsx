import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import upGradLogo from '/image.png';
import './App.css';

import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProductList from './components/ProductList';
import CartPreview from './components/CartPreview';
import Cart from './components/Cart';
import OrderTracking from './components/OrderTracking';
import ProductDetail from './components/ProductDetail';
import UserProfile from './components/UserProfile';
import OrderConfirmation from './components/OrderConfirmation';
import { useAuth } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <>
      <div className="header flex items-center justify-between p-6 bg-white bg-opacity-90 backdrop-blur-md border-b border-yellow-600 shadow-lg">
        <div className="flex items-center cursor-pointer" onClick={handleHomeClick}>
          <img src={upGradLogo} className="logo h-16 mr-4 hover:shadow-lg transition" alt="GroceryDash logo" />
          <div>
            <h1 className="text-6xl font-bold text-yellow-800">GroceryDash</h1>
            <p className="text-lg text-yellow-700 font-semibold">When Hunger meets Speed</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <CartPreview />
          {user ? (
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/profile')} className="text-yellow-800 font-semibold hover:underline">{user.name}</button>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="bg-gradient-to-t from-red-600 to-red-800 text-white px-4 py-2 rounded-lg hover:shadow-lg transition font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/signin')}
                className="bg-gradient-to-t from-yellow-600 to-yellow-800 text-white px-4 py-2 rounded-lg hover:shadow-lg transition font-semibold"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-t from-yellow-600 to-yellow-800 text-white px-4 py-2 rounded-lg hover:shadow-lg transition font-semibold"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/tracking/:orderId" element={<OrderTracking />} />
      </Routes>
    </>
  );
}

export default App;
