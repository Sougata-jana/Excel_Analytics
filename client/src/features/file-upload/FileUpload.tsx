import React, { useState, useCallback } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import {
    Box,
    Paper,
    Typography,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';
import axios from '../../config/axios';

interface FileUploadProps {}

const FileUpload: React.FC<FileUploadProps> = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setUploading(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData();
        acceptedFiles.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post('/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess('Files uploaded successfully!');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error uploading files');
        } finally {
            setUploading(false);
        }
    }, []);

    const dropzoneOptions: DropzoneOptions = {
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls'],
        },
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Upload Excel Files
            </Typography>
            <Paper
                {...getRootProps()}
                sx={{
                    p: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: isDragActive ? '#f0f8ff' : '#fff',
                    border: '2px dashed #ccc',
                    '&:hover': {
                        backgroundColor: '#f0f8ff',
                    },
                }}
            >
                <input {...getInputProps()} />
                {uploading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Drag and drop Excel files here, or click to select files
                        </Typography>
                        <Button variant="contained" sx={{ mt: 2 }}>
                            Select Files
                        </Button>
                    </>
                )}
            </Paper>
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {success}
                </Alert>
            )}
        </Box>
    );
};

export default FileUpload;
