import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Container,
    Alert,
    CircularProgress,
    LinearProgress
} from '@mui/material';
import {
    MarkEmailRead,
    Timer,
    Refresh
} from '@mui/icons-material';
import { verifyEmail, resendVerification } from '../services/authApi';

const EmailVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
    const [canResend, setCanResend] = useState(false);

    // Get email from navigation state
    const email = location.state?.email || '';
    const message = location.state?.message || '';
    const isExistingUser = location.state?.isExistingUser || false;

    useEffect(() => {
        // Redirect if no email provided
        if (!email) {
            navigate('/signup');
            return;
        }

        // Countdown timer
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    setCanResend(true);
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [email, navigate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleVerificationCodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Only allow digits
        if (value.length <= 6) {
            setVerificationCode(value);
            if (error) setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (verificationCode.length !== 6) {
            setError('Please enter a 6-digit verification code');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await verifyEmail(email, verificationCode);
            
            if (response.status === 200) {
                setSuccess('Email verified successfully! Redirecting to dashboard...');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            console.error('Verification failed:', error);
            setError(error.error || 'Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setResendLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await resendVerification(email);
            
            if (response.status === 200) {
                setSuccess('Verification code sent successfully!');
                setTimeLeft(180); // Reset timer
                setCanResend(false);
                
                // Clear success message after 3 seconds
                setTimeout(() => setSuccess(''), 3000);
            }
        } catch (error) {
            console.error('Resend failed:', error);
            setError(error.error || 'Failed to resend verification code. Please try again.');
        } finally {
            setResendLoading(false);
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
                        <MarkEmailRead sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h4" fontWeight="600" color="primary.dark">
                            {isExistingUser ? 'Verify Your Email' : 'Check Your Email'}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                            {isExistingUser 
                                ? `We've sent a new verification code to ${email}`
                                : `We've sent a verification code to ${email}`
                            }
                        </Typography>
                        {message && (
                            <Alert severity="info" sx={{ textAlign: 'left' }}>
                                {message}
                            </Alert>
                        )}
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert severity="success" sx={{ mb: 3 }}>
                            {success}
                        </Alert>
                    )}

                    {/* Timer Display */}
                    <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                            <Timer sx={{ mr: 1, color: timeLeft > 60 ? 'primary.main' : 'warning.main' }} />
                            <Typography 
                                variant="body1" 
                                color={timeLeft > 60 ? 'primary.main' : 'warning.main'}
                                fontWeight="600"
                            >
                                {timeLeft > 0 ? `Code expires in ${formatTime(timeLeft)}` : 'Code expired'}
                            </Typography>
                        </Box>
                        <LinearProgress 
                            variant="determinate" 
                            value={(timeLeft / 180) * 100}
                            sx={{ 
                                height: 6, 
                                borderRadius: 3,
                                backgroundColor: 'grey.200',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: timeLeft > 60 ? 'primary.main' : 'warning.main'
                                }
                            }}
                        />
                    </Box>

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Verification Code"
                            value={verificationCode}
                            onChange={handleVerificationCodeChange}
                            placeholder="Enter 6-digit code"
                            inputProps={{
                                maxLength: 6,
                                style: { 
                                    textAlign: 'center', 
                                    fontSize: '1.5rem',
                                    letterSpacing: '0.5rem',
                                    fontWeight: 'bold'
                                }
                            }}
                            sx={{ 
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderWidth: 2,
                                    },
                                }
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading || verificationCode.length !== 6}
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
                                'Verify Email'
                            )}
                        </Button>

                        {/* Resend Code Section */}
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Didn't receive the code?
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={resendLoading ? <CircularProgress size={16} /> : <Refresh />}
                                onClick={handleResendCode}
                                disabled={!canResend || resendLoading}
                                sx={{
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 500
                                }}
                            >
                                {resendLoading ? 'Sending...' : 'Resend Code'}
                            </Button>
                        </Box>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Wrong email?{' '}
                                <Link 
                                    to="/signup" 
                                    style={{ 
                                        color: '#2196f3', 
                                        textDecoration: 'none',
                                        fontWeight: 500
                                    }}
                                >
                                    Sign up again
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default EmailVerification; 