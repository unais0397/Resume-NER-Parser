import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, CircularProgress, Alert, Container, } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadResume } from '../services/resumeApi';

const ResumeUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type === 'application/pdf') {
                setFile(selectedFile);
                setError(null);
            } else {
                setFile(null);
                setError('Please upload a PDF file');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setError(null);

        try {
            const apiResponse = await uploadResume(file);
            if (apiResponse.status === 200) {
                // Resume is automatically saved to database by the backend
                onUploadSuccess();
                navigate(`/resume/${apiResponse.resume_id}`);
            } else {
                throw new Error(`API Error: ${apiResponse.message || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.message || 'Failed to process resume. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={4} sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 3,
                mx: 'auto',
                mt: 2,
                background: 'linear-gradient(to bottom, #ffffff, #f7f9fc)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
            }}>
                <Typography variant="h5" fontWeight="500" gutterBottom color="primary.dark">
                    Upload Resume
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                    Upload a PDF resume to extract entities using AI-powered NER
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            border: '2px dashed',
                            borderColor: 'primary.light',
                            borderRadius: 3,
                            p: 3,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 3,
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            backgroundColor: 'rgba(33, 150, 243, 0.04)',
                            '&:hover': {
                                borderColor: 'primary.main',
                                backgroundColor: 'rgba(33, 150, 243, 0.08)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                        onClick={() => document.getElementById('resume-upload')?.click()}
                    >
                        <input
                            id="resume-upload"
                            type="file"
                            accept="application/pdf"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                        {file ? (
                            <Typography variant="body1" fontWeight="500" sx={{ textAlign: 'center' }}>
                                {file.name}
                            </Typography>
                        ) : (
                            <>
                                <Typography variant="body1" gutterBottom fontWeight="500">
                                    Drag & drop your resume here
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    or click to browse (PDF files only)
                                </Typography>
                            </>
                        )}
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!file || loading}
                        size="medium"
                        sx={{
                            minWidth: 160,
                            py: 1.2,
                            px: 3,
                            fontSize: '0.95rem',
                            borderRadius: 2,
                            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                            '&:hover': {
                                boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)',
                            }
                        }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Analyze Resume'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ResumeUpload;
