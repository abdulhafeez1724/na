import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Login function
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/token/`, { username, password });
    const { access, refresh } = response.data;

    // Save tokens in localStorage
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);

    return true; // Login success
  } catch (error) {
    console.error('Login failed:', error);
    return false; // Login failed
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Get new access token using refresh token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token found');

    const response = await axios.post(`${API_BASE_URL}/token/refresh/`, { refresh: refreshToken });
    const { access } = response.data;

    localStorage.setItem('accessToken', access);
    return access;
  } catch (error) {
    console.error('Token refresh failed:', error);
    logout();
  }
};
