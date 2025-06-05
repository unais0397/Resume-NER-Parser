import axios from 'axios';

const API_URL = 'http://127.0.0.1:8002';

// Create axios instance with default config
const resumeApi = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
resumeApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle token expiration
resumeApi.interceptors.response.use(
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

export const getResumes = async () => {
    try {
        const response = await resumeApi.get('/resumes');
        return response.data.data.resumes;
    } catch (error) {
        console.error('Get resumes error:', error);
        throw error.response?.data || error;
    }
};

export const getResumeById = async (resumeId) => {
    try {
        const response = await resumeApi.get(`/resumes/${resumeId}`);
        return response.data.data.resume;
    } catch (error) {
        console.error('Get resume error:', error);
        throw error.response?.data || error;
    }
};

export const saveResume = async (filename, entities, fileData = null) => {
    try {
        const response = await resumeApi.post('/resumes', {
            filename,
            entities,
            file_data: fileData
        });
        return response.data.data.resume;
    } catch (error) {
        console.error('Save resume error:', error);
        throw error.response?.data || error;
    }
};

export const deleteResume = async (resumeId) => {
    try {
        const response = await resumeApi.delete(`/resumes/${resumeId}`);
        return response.data;
    } catch (error) {
        console.error('Delete resume error:', error);
        throw error.response?.data || error;
    }
};

export const updateResume = async (resumeId, updateData) => {
    try {
        const response = await resumeApi.put(`/resumes/${resumeId}`, updateData);
        return response.data.data.resume;
    } catch (error) {
        console.error('Update resume error:', error);
        throw error.response?.data || error;
    }
};

// Upload resume for processing (uses the existing /minedata endpoint)
export const uploadResume = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await axios.post(`${API_URL}/minedata`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading resume:', error);
        throw error;
    }
}; 