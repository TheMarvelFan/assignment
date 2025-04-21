import { useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user';
import { authApi } from '../api/authApi';
import { AuthContext, AuthContextType } from './AuthContextDefinition';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for token in localStorage and validate
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Fetch current user with the token
        const data = await authApi.getCurrentUser();
        setUser(data.user);
      } catch (err) {
        // Clear invalid token
        localStorage.removeItem('token');
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await authApi.login(email, password);

      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await authApi.register(email, password);

      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export type { AuthContextType };
