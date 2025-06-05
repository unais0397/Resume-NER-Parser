import axios from 'axios';

const API_URL = 'http://127.0.0.1:8002';

// Create axios instance with default config
const authApi = axios.create({
    baseURL: `${API_URL}/auth`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
authApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle token expiration
authApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const signup = async (userData) => {
    try {
        const response = await authApi.post('/signup', userData);
        return response.data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error.response?.data || error;
    }
};

export const verifyEmail = async (email, verificationCode) => {
    try {
        const response = await authApi.post('/verify-email', {
            email,
            verification_code: verificationCode
        });
        
        // Store token and user data on successful verification
        if (response.data.data?.access_token) {
            localStorage.setItem('access_token', response.data.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        
        return response.data;
    } catch (error) {
        console.error('Email verification error:', error);
        throw error.response?.data || error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await authApi.post('/login', {
            email,
            password
        });
        
        // Store token and user data on successful login
        if (response.data.data?.access_token) {
            localStorage.setItem('access_token', response.data.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error.response?.data || error;
    }
};

export const resendVerification = async (email) => {
    try {
        const response = await authApi.post('/resend-verification', { email });
        return response.data;
    } catch (error) {
        console.error('Resend verification error:', error);
        throw error.response?.data || error;
    }
};

export const getProfile = async () => {
    try {
        const response = await authApi.get('/profile');
        return response.data;
    } catch (error) {
        console.error('Get profile error:', error);
        throw error.response?.data || error;
    }
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    return !!(token && user);
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const checkUserStatus = async (email) => {
    try {
        const response = await authApi.post('/check-user-status', { email });
        return response.data;
    } catch (error) {
        console.error('Check user status error:', error);
        throw error.response?.data || error;
    }
}; 