import { useNavigate } from 'react-router-dom';
import { useAuth as useAuthContext } from '../context/AuthContext';
import { useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  // Add other user fields as needed
}

interface DecodedToken {
  sub: string;
  name: string;
  exp: number;
}

export const useAuth = () => {
  const { login, logout, isAuthenticated, token } = useAuthContext();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const fetchUserInfo = async () => {
    if (!token) return;
    
    try {
      const response = await fetch('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserInfo();
    } else {
      setUser(null);
    }
  }, [isAuthenticated, token]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,  // FastAPI OAuth2 expects 'username'
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      login(data.access_token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      };
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return {
    handleLogin,
    handleLogout,
    isAuthenticated,
    token,
    user,
  };
};
