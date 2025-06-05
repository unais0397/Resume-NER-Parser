import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'resume-history';

export const saveResume = (filename, apiResponse, fileData = null) => {
    const resumes = getResumes();
    const newResume = {
        id: uuidv4(),
        filename: filename,
        timestamp: new Date().toISOString(),
        entities: apiResponse.entities || {},
        fileData: fileData, // Store the PDF file data as base64
    };
    const updatedResumes = [newResume, ...resumes];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResumes));
    return newResume;
};

export const getResumes = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const getResumeById = (id) => {
    const resumes = getResumes();
    return resumes.find(resume => resume.id === id);
};

export const deleteResume = (id) => {
    const resumes = getResumes();
    const updatedResumes = resumes.filter(resume => resume.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResumes));
};
