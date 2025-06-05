import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box, Paper, Typography, Chip, Divider, ToggleButton, ToggleButtonGroup, Container, Card, CardContent, CircularProgress, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { getResumeById } from '../services/resumeApi';

// Entity type to icon mapping
const ENTITY_ICONS = {
    'NAME': <PersonIcon />,
    'EMAIL': <EmailIcon />,
    'COLLEGE NAME': <SchoolIcon />,
    'COMPANY': <BusinessIcon />,
    'DEGREE': <SchoolIcon />,
    'DESIGNATION': <WorkIcon />,
    'LOCATION': <LocationOnIcon />,
    'SKILLS': <CodeIcon />,
    'DATE': <CalendarTodayIcon />
};

// Entity type to color mapping
const ENTITY_COLORS = {
    'NAME': { bg: '#e3f2fd', text: '#1565c0' },
    'EMAIL': { bg: '#e8f5e9', text: '#2e7d32' },
    'PHONE': { bg: '#fff3e0', text: '#e65100' },
    'COLLEGE NAME': { bg: '#f3e5f5', text: '#7b1fa2' },
    'DEGREE': { bg: '#e0f7fa', text: '#006064' },
    'DESIGNATION': { bg: '#fbe9e7', text: '#bf360c' },
    'COMPANY': { bg: '#f1f8e9', text: '#33691e' },
    'LOCATION': { bg: '#ede7f6', text: '#4527a0' },
    'SKILLS': { bg: '#fff8e1', text: '#ff6f00' },
    'DATE': { bg: '#f9fbe7', text: '#827717' }
};

const defaultColor = { bg: '#f5f5f5', text: '#616161' };

const getEntityColor = (label) => ENTITY_COLORS[label] || defaultColor;
const getEntityIcon = (label) => ENTITY_ICONS[label] || null;

const ResumeDetails = () => {
    const { id } = useParams();
    const [viewMode, setViewMode] = useState('resume');
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResume = async () => {
            if (!id) {
                setError('No resume ID provided');
                setLoading(false);
                return;
            }

            try {
                const resumeData = await getResumeById(id);
                setResume(resumeData);
            } catch (err) {
                console.error('Failed to fetch resume:', err);
                setError('Failed to load resume');
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, [id]);

    if (!id) {
        return <Navigate to="/" />;
    }

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Loading resume...
                </Typography>
            </Container>
        );
    }

    if (error || !resume) {
        return (
            <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="error">
                    {error || 'Resume not found'}
                </Typography>
                <Button onClick={() => window.history.back()} sx={{ mt: 2 }}>
                    Go Back
                </Button>
            </Container>
        );
    }

    const handleViewChange = (event, newViewMode) => {
        if (newViewMode !== null) {
            setViewMode(newViewMode);
        }
    };

    // Count total entities
    const totalEntities = Object.values(resume.entities).reduce((count, entities) => count + entities.length, 0);

    const renderPdfView = () => (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            {resume.file_data ? (
                <Paper sx={{ 
                    width: '100%', 
                    height: '800px', 
                    overflow: 'hidden',
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}>
                    <iframe
                        src={resume.file_data}
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                        title="Resume PDF"
                    />
                </Paper>
            ) : (
                <Paper sx={{
                    p: 5,
                    textAlign: 'center',
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    width: '100%'
                }}>
                    <PictureAsPdfIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        PDF file not available
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        The original PDF file was not stored with this resume
                    </Typography>
                </Paper>
            )}
        </Box>
    );

    

    const renderHighlightView = () => (
        <Box sx={{ mt: 2 }}>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                mx: -1 // Negative margin to counteract padding
            }}>
                {Object.entries(resume.entities).map(([label, values]) => (
                    <Box
                        key={label}
                        sx={{
                            width: { xs: '100%', sm: '50%', md: '33.33%' },
                            p: 1,
                            boxSizing: 'border-box'
                        }}
                    >
                        <Card
                            elevation={2}
                            sx={{
                                height: '100%',
                                borderTop: `4px solid ${getEntityColor(label).text}`,
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Box sx={{
                                        mr: 1.5,
                                        p: 0.8,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '50%',
                                        bgcolor: getEntityColor(label).bg,
                                        color: getEntityColor(label).text,
                                    }}>
                                        {getEntityIcon(label)}
                                    </Box>
                                    <Typography variant="h6" fontWeight="500">
                                        {label}
                                    </Typography>
                                </Box>
                                <Box sx={{ pl: 1 }}>
                                    {values.map((value, index) => (
                                        <Typography
                                            key={index}
                                            variant="body1"
                                            component="div"
                                            sx={{
                                                mb: 1,
                                                fontSize: '1rem',
                                                lineHeight: 1.5
                                            }}
                                        >
                                            {value}
                                        </Typography>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper sx={{
                p: 4,
                borderRadius: 2,
                backgroundImage: 'linear-gradient(to right, #f5f7fa, #ffffff)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
                <Typography variant="h4" gutterBottom fontWeight="500" color="primary.dark" sx={{ mb: 1 }}>
                    {resume.filename}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                    Uploaded on {new Date(resume.created_at).toLocaleString()}
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h5" fontWeight="500" sx={{ mr: 2 }}>
                            Extracted Entities
                        </Typography>
                        <Chip label={totalEntities} size="medium" color="primary" sx={{ fontWeight: 'bold' }} />
                    </Box>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewChange}
                        size="medium"
                        color="primary"
                        sx={{ '& .MuiToggleButton-root': { px: 3 } }}
                    >
                        <ToggleButton value="resume">
                            <PictureAsPdfIcon sx={{ mr: 1 }} />
                            Resume
                        </ToggleButton>
                        <ToggleButton value="highlight">Cards</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                {viewMode === 'resume' ? (
                    renderPdfView()
                ) : totalEntities > 0 ? (
                    renderHighlightView()
                ) : (
                    <Paper sx={{
                        p: 5,
                        mt: 3,
                        textAlign: 'center',
                        backgroundColor: '#f9f9f9',
                        borderRadius: 2
                    }}>
                        <Typography variant="h6" color="text.secondary">
                            No entities were extracted from this resume
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                            Try uploading a different resume or check the NER model configuration
                        </Typography>
                    </Paper>
                )}
            </Paper>
        </Container>
    );
};

export default ResumeDetails;
