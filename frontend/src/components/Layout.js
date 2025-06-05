import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getResumes } from '../services/resumeApi';
import { getCurrentUser, logout, isAuthenticated } from '../services/authApi';

const Layout = () => {
    const [resumes, setResumes] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const loadResumes = async () => {
        try {
            if (isAuthenticated()) {
                const resumesData = await getResumes();
                setResumes(resumesData);
            }
        } catch (error) {
            console.error('Failed to load resumes:', error);
            setResumes([]);
        }
    };

    useEffect(() => {
        loadResumes();
        // Load user data
        if (isAuthenticated()) {
            setUser(getCurrentUser());
        }
    }, []);

    const handleNewUpload = () => {
        navigate('/');
    };

    const handleDelete = () => {
        loadResumes();
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleMenuClose();
    };

    const handleToggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const isHomePage = location.pathname === '/';

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f7f9fc' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(90deg, #2196f3, #1976d2)'
            }}>
                <Toolbar sx={{ height: 70 }}>
                    <Typography variant="h5" component="div" sx={{
                        flexGrow: 1,
                        fontWeight: 600,
                        letterSpacing: '-0.5px'
                    }}>
                        Resume NER Parser
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {!isHomePage && (
                            <Button
                                color="inherit"
                                startIcon={<AddIcon />}
                                onClick={handleNewUpload}
                                sx={{
                                    py: 1,
                                    px: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    }
                                }}
                            >
                                New Upload
                            </Button>
                        )}
                        
                        {/* User Menu */}
                        {user && (
                            <>
                                <IconButton
                                    onClick={handleMenuOpen}
                                    sx={{
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        }
                                    }}
                                >
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                                        {user.full_name?.charAt(0).toUpperCase()}
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    <MenuItem disabled>
                                        <Box>
                                            <Typography variant="body2" fontWeight="600">
                                                {user.full_name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {user.email}
                                            </Typography>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <LogoutIcon sx={{ mr: 1 }} />
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Sidebar 
                resumes={resumes} 
                onDelete={handleDelete} 
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={handleToggleSidebar}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3 },
                    mt: 9,
                    overflow: 'auto',
                    backgroundColor: '#f7f9fc',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: `calc(100vw - ${sidebarCollapsed ? '60px' : '300px'})`,
                    transition: 'width 0.3s ease',
                }}
            >
                <Outlet context={{ refreshResumes: loadResumes }} />
            </Box>
        </Box>
    );
};

export default Layout;
