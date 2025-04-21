import { User } from './user';

// Response types
export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface RegisterResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface UserResponse {
  success: boolean;
  user: User;
}

// Request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}