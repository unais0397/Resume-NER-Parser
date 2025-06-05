import { useOutletContext } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import ResumeUpload from '../components/ResumeUpload';

const HomePage = () => {
    const { refreshResumes } = useOutletContext();

    return (
        <Box sx={{ width: '100%', maxWidth: '1200px', py: 1 }}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography
                    variant="h4"
                    component="h1"
                    fontWeight="700"
                    sx={{
                        mb: 1.5,
                        background: 'linear-gradient(90deg, #1565C0, #2196F3)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.5px'
                    }}
                >
                    Resume Entity Extraction
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        maxWidth: 600,
                        mx: 'auto',
                        fontWeight: 400,
                        lineHeight: 1.4
                    }}
                >
                    Extract key information from resumes using advanced NER technology. Our AI-powered parser identifies entities like names, skills, education, and more.
                </Typography>
            </Box>
            <ResumeUpload onUploadSuccess={refreshResumes} />
        </Box>
    );
};

export default HomePage;
