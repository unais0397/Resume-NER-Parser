import { Link, useParams } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemText, Drawer, Box, Typography, IconButton, Divider, Tooltip, Avatar, Badge } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { deleteResume } from '../services/resumeApi';

const Sidebar = ({ resumes, onDelete, isCollapsed, onToggleCollapse }) => {
    const { id } = useParams();

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleDelete = async (e, resumeId) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await deleteResume(resumeId);
            onDelete(resumeId);
        } catch (error) {
            console.error('Failed to delete resume:', error);
        }
    };

    // Count total entities for each resume
    const getEntityCount = (resume) => {
        return Object.values(resume.entities).reduce((total, entities) => total + entities.length, 0);
    };

    const drawerWidth = isCollapsed ? 60 : 300;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                transition: 'width 0.3s ease',
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: '#ffffff',
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
                    border: 'none',
                    transition: 'width 0.3s ease',
                    overflow: 'hidden',
                },
            }}
        >
            <Box sx={{ pt: 9 }} />
            
            {/* Toggle Button */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: isCollapsed ? 'center' : 'flex-end', 
                p: 1,
                borderBottom: '1px solid #e0e0e0'
            }}>
                <IconButton 
                    onClick={onToggleCollapse}
                    sx={{ 
                        color: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'primary.light',
                            color: 'primary.dark'
                        }
                    }}
                >
                    {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Box>

            {!isCollapsed && (
                <>
                    <Box sx={{ padding: 2.5 }}>
                        <Typography variant="h6" fontWeight={600} color="primary.dark">
                            Resume History
                        </Typography>
                    </Box>
                    <Divider />
                </>
            )}
            <List sx={{ pt: 0 }}>
                {resumes.length === 0 ? (
                    !isCollapsed && (
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                            <DescriptionIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                            <Typography variant="body1" color="text.secondary">
                                No resume history yet
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Upload a resume to get started
                            </Typography>
                        </Box>
                    )
                ) : (
                    resumes.map((resume) => {
                        const entityCount = getEntityCount(resume);
                        return (
                            <ListItem
                                key={resume.id}
                                disablePadding
                                secondaryAction={
                                    !isCollapsed && (
                                        <Tooltip title="Delete">
                                            <IconButton
                                                edge="end"
                                                onClick={(e) => handleDelete(e, resume.id)}
                                                sx={{ mr: 1 }}
                                            >
                                                <DeleteIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                            </IconButton>
                                        </Tooltip>
                                    )
                                }
                                sx={{
                                    mb: 0.5,
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                    }
                                }}
                            >
                                <ListItemButton
                                    component={Link}
                                    to={`/resume/${resume.id}`}
                                    selected={id === resume.id}
                                    sx={{
                                        borderRadius: 1,
                                        py: 1.5,
                                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                                        '&.Mui-selected': {
                                            backgroundColor: 'primary.light',
                                            color: 'primary.dark',
                                            '&:hover': {
                                                backgroundColor: 'primary.light',
                                            },
                                        }
                                    }}
                                >
                                    <Tooltip title={isCollapsed ? resume.filename : ''} placement="right">
                                        <Avatar
                                            sx={{
                                                mr: isCollapsed ? 0 : 1.5,
                                                bgcolor: id === resume.id ? 'primary.main' : 'grey.200',
                                                color: id === resume.id ? 'white' : 'grey.700',
                                                width: 36,
                                                height: 36,
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                            }}
                                        >
                                            <DescriptionIcon fontSize="small" />
                                        </Avatar>
                                    </Tooltip>
                                    {!isCollapsed && (
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography
                                                        noWrap
                                                        sx={{
                                                            maxWidth: '160px',
                                                            fontWeight: id === resume.id ? 600 : 400
                                                        }}
                                                    >
                                                        {resume.filename}
                                                    </Typography>
                                                    {entityCount > 0 && (
                                                        <Badge
                                                            badgeContent={entityCount}
                                                            color="primary"
                                                            sx={{ ml: 1 }}
                                                            max={999}
                                                        />
                                                    )}
                                                </Box>
                                            }
                                            secondary={formatDate(resume.created_at)}
                                            primaryTypographyProps={{
                                                noWrap: true,
                                            }}
                                            secondaryTypographyProps={{
                                                noWrap: true,
                                                sx: { fontSize: '0.75rem' }
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        );
                    })
                )}
            </List>
        </Drawer>
    );
};

export default Sidebar;
