import { Typography, Button, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotFoundPage = () => {
    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Paper elevation={3} sx={{
                p: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                borderRadius: 3,
                py: 8,
                background: 'linear-gradient(to bottom, #ffffff, #f7f9fc)',
            }}>
                <ErrorOutlineIcon sx={{
                    fontSize: 120,
                    color: 'primary.main',
                    opacity: 0.8,
                    mb: 3
                }} />
                <Typography variant="h1" fontWeight="700" color="primary.dark" sx={{ mb: 2 }}>
                    404
                </Typography>
                <Typography variant="h4" color="text.primary" sx={{ mb: 3, fontWeight: 500 }}>
                    Page not found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </Typography>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    size="large"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        px: 4,
                        py: 1.2,
                        borderRadius: 2,
                        fontSize: '1rem'
                    }}
                >
                    Back to Home
                </Button>
            </Paper>
        </Container>
    );
};

export default NotFoundPage;
