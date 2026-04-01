import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token);
        navigate('/');
      } else {
        setError(data.errors?.[0]?.msg || 'Invalid credentials');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl border border-yellow-600">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-800">Welcome Back</h2>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-yellow-700 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-yellow-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-50 transition duration-300"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-yellow-700 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-yellow-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-50 transition duration-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-t from-yellow-600 to-yellow-800 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300 font-semibold"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
