/**
 * Authentication utility functions
 * This file contains utilities for handling authentication in the application
 */

/**
 * Storage keys
 */
const TOKEN_KEY = "fake_store_token";
const USER_KEY = "fake_store_user";

/**
 * Interface for user information
 */
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  avatar: string;
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated, false otherwise
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token; // Convert to boolean
};

/**
 * Login user and store token
 * @param token JWT token
 * @param user User information
 */
export const login = (token: string, username?: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  if (username) {
    localStorage.setItem(USER_KEY, JSON.stringify(username));
  }
};

/**
 * Logout user and remove token
 */
export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Get authentication token
 * @returns {string|null} Token or null if not found
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Get current user information
 * @returns {User|null} User object or null if not found
 */
export const getUser = (): User | null => {
  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) return null;

  try {
    return JSON.parse(userJson) as User;
  } catch (e) {
    console.error("Failed to parse user data", e);
    return null;
  }
};

/**
 * Update user information
 * @param userData Partial user data to update
 */
export const updateUser = (userData: Partial<User>): void => {
  const currentUser = getUser();
  if (!currentUser) return;

  const updatedUser = { ...currentUser, ...userData };
  localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
};
