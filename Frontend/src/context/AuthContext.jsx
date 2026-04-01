import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchCurrentUser();
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/me', {
        headers: { 'x-auth-token': token }
      });
      if (res.ok) {
        const u = await res.json();
        setUser(u);
      } else {
        // token invalid or expired
        setToken(null);
      }
    } catch (err) {
      setToken(null);
    }
  };

  const login = (newToken) => {
    setToken(newToken);
  };
  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
