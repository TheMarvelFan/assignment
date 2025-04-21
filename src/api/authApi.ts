import axios from 'axios';
import { LoginResponse, RegisterResponse, UserResponse } from '../types/api';

const API_URL = 'http://localhost:5000/api/auth';

// Create axios instance with defaults
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  // Login user
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/login', { email, password });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || 'Failed to login');
      }
      throw new Error('Network error. Please try again.');
    }
  },

  // Register user
  register: async (email: string, password: string): Promise<RegisterResponse> => {
    try {
      const response = await api.post<RegisterResponse>('/register', { email, password });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || 'Failed to register');
      }
      throw new Error('Network error. Please try again.');
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<UserResponse> => {
    try {
      const response = await api.get<UserResponse>('/me');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || 'Failed to get user data');
      }
      throw new Error('Network error. Please try again.');
    }
  },
};