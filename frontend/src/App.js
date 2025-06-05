import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import NotFoundPage from './pages/NotFoundPage';
import Signup from './components/Signup';
import Login from './components/Login';
import EmailVerification from './components/EmailVerification';
import ProtectedRoute from './components/ProtectedRoute';

const theme = createTheme({
    palette: {
        primary: {
            light: '#e3f2fd',
            main: '#2196f3',
            dark: '#1565c0',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#f3e5f5',
            main: '#9c27b0',
            dark: '#7b1fa2',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f7f9fc',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 700,
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 500,
        },
        h6: {
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
    shadows: [
        'none',
        '0px 2px 4px rgba(0,0,0,0.05)',
        '0px 4px 8px rgba(0,0,0,0.05)',
        '0px 6px 12px rgba(0,0,0,0.08)',
        '0px 8px 16px rgba(0,0,0,0.08)',
        '0px 10px 20px rgba(0,0,0,0.10)',
        ...Array(19).fill('none')
    ],
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                },
                containedPrimary: {
                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)',
                    '&:hover': {
                        boxShadow: '0 6px 16px rgba(33, 150, 243, 0.3)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    {/* Authentication Routes */}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/verify-email" element={<EmailVerification />} />
                    
                    {/* Protected Routes */}
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<HomePage />} />
                        <Route path="resume/:id" element={<ResumePage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
