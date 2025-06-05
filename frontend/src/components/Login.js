import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Container,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Login as LoginIcon,
    Email,
    Lock
} from '@mui/icons-material';
import { login } from '../services/authApi';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [apiError, setApiError] = useState('');
    const [showVerificationHelper, setShowVerificationHelper] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        
        // Clear API error when user makes changes
        if (apiError) {
            setApiError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setApiError('');

        try {
            const response = await login(formData.email, formData.password);
            
            if (response.status === 200) {
                // Navigate to home page
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
            
            if (error.status === 403 && error.data?.verification_required) {
                // User exists but email not verified
                setApiError('Your email address has not been verified yet.');
                setShowVerificationHelper(true);
                setUserEmail(error.data.email);
            } else if (error.status === 403) {
                setApiError('Please verify your email before logging in.');
            } else {
                setApiError(error.error || 'Login failed. Please check your credentials.');
                setShowVerificationHelper(false);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, mb: 4 }}>
                <Paper elevation={6} sx={{
                    p: 4,
                    borderRadius: 3,
                    background: 'linear-gradient(to bottom, #ffffff, #f7f9fc)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h4" fontWeight="600" color="primary.dark">
                            Welcome Back
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                            Sign in to your Resume NER Parser account
                        </Typography>
                    </Box>

                    {apiError && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {apiError}
                        </Alert>
                    )}

                    {showVerificationHelper && (
                        <Alert severity="info" sx={{ mb: 3 }}>
                            <Box>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    Your email address has not been verified yet. A new verification code has been sent to your email.
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => navigate('/verify-email', { 
                                            state: { 
                                                email: userEmail,
                                                message: 'Please enter your verification code to complete login.'
                                            }
                                        })}
                                    >
                                        Go to Verification
                                    </Button>
                                </Box>
                            </Box>
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            name="email"
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 3 }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                                '&:hover': {
                                    boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)',
                                },
                                mb: 3
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Sign In'
                            )}
                        </Button>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Don't have an account?{' '}
                                <Link 
                                    to="/signup" 
                                    style={{ 
                                        color: '#2196f3', 
                                        textDecoration: 'none',
                                        fontWeight: 500
                                    }}
                                >
                                    Sign Up
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login; 