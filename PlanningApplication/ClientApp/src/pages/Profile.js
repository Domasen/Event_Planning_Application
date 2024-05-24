import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';
import MyBookings from './MyBookings';
import MyEvents from './MyEvents';
import CalendarComponent from './CalendarComponent'; // Import the CalendarComponent

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#7F1425',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#7F1425',
        },
    },
});

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Kamile Samusiovaite',
        dateOfBirth: '2002-02-12',
        email: 'kamilesamusiovaite@gmail.com',
        contactNumber: '860569***',
        description: 'Esu Kamile, laisvalaikiu organizuoju nedideles apimties renginius, esu sukaupusi daugiau nei 3 metų darbo patirtį šioje srityje. Pati mėgstu dalyvauti įvairiuose renginiuose.',
        profilePicture: 'https://via.placeholder.com/120', // Placeholder for profile picture
    });
    const [tabValue, setTabValue] = useState(0); // Set default tab to "About me"
    const [settings, setSettings] = useState({
        eventNotifications: true,
        offersNotifications: false,
        darkMode: false,
    });

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Add your save logic here
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (upload) => {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    profilePicture: upload.target.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSettingChange = (e) => {
        const { name, checked } = e.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: checked,
        }));
    };

    return (
        <ThemeProvider theme={settings.darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Container component="main" maxWidth="lg" sx={{ flex: '1 0 auto' }}>
                    <Paper sx={{ p: 3, mt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm="auto" display="flex" flexDirection="column" alignItems="center">
                                <Avatar
                                    sx={{ width: 120, height: 120, mb: 2 }}
                                    src={formData.profilePicture}
                                    alt="Profile Picture"
                                />
                                {isEditing && (
                                    <Button
                                        variant="contained"
                                        component="label"
                                        sx={{
                                            backgroundColor: '#7F1425',
                                            '&:hover': {
                                                backgroundColor: '#63101C',
                                            },
                                        }}
                                    >
                                        Upload Photo
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleProfilePictureChange}
                                        />
                                    </Button>
                                )}
                            </Grid>
                            <Grid item xs>
                                {isEditing ? (
                                    <>
                                        <TextField
                                            fullWidth
                                            name="name"
                                            label="Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            sx={{ mb: 2 }}
                                        />
                                        <TextField
                                            fullWidth
                                            name="dateOfBirth"
                                            label="Date of Birth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            sx={{ mb: 2 }}
                                        />
                                        <TextField
                                            fullWidth
                                            name="email"
                                            label="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            sx={{ mb: 2 }}
                                        />
                                        <TextField
                                            fullWidth
                                            name="contactNumber"
                                            label="Contact Number"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            sx={{ mb: 2 }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Typography component="h1" variant="h5" sx={{ color: '#7F1425' }}>
                                            {formData.name}
                                        </Typography>
                                        <Typography variant="body1">
                                            Date of Birth: {formData.dateOfBirth}
                                        </Typography>
                                        <Typography variant="body1">
                                            Email: {formData.email}
                                        </Typography>
                                        <Typography variant="body1">
                                            Contact number: {formData.contactNumber}
                                        </Typography>
                                    </>
                                )}
                                <Button
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        backgroundColor: '#7F1425',
                                        '&:hover': {
                                            backgroundColor: '#63101C',
                                        },
                                    }}
                                    onClick={isEditing ? handleSaveClick : handleEditClick}
                                >
                                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                                </Button>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            aria-label="User Profile Tabs"
                            textColor="primary"
                            indicatorColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label="About me" />
                            <Tab label="My Bookings" />
                            <Tab label="My Events" />
                            <Tab label="Calendar" />
                            <Tab label="Settings" />
                        </Tabs>
                        <Box sx={{ mt: 2 }}>
                            {tabValue === 0 && (
                                <div>
                                    {isEditing ? (
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            name="description"
                                            label="Description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <Typography variant="body1">{formData.description}</Typography>
                                    )}
                                    {isEditing && (
                                        <Button
                                            variant="contained"
                                            sx={{
                                                mt: 2,
                                                backgroundColor: '#7F1425',
                                                '&:hover': {
                                                    backgroundColor: '#63101C',
                                                },
                                            }}
                                            onClick={handleSaveClick}
                                        >
                                            Save Changes
                                        </Button>
                                    )}
                                </div>
                            )}
                            {tabValue === 1 && <MyBookings />}
                            {tabValue === 2 && <MyEvents />}
                            {tabValue === 3 && (
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                                    <CalendarComponent />
                                </Box>
                            )}
                            {tabValue === 4 && (
                                <Box sx={{ mt: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={8} display="flex" alignItems="center">
                                            <Typography variant="body1">Get Event Notifications</Typography>
                                        </Grid>
                                        <Grid item xs={4} display="flex" justifyContent="flex-end">
                                            <Switch
                                                checked={settings.eventNotifications}
                                                onChange={handleSettingChange}
                                                name="eventNotifications"
                                                sx={{
                                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                                        color: '#7F1425',
                                                    },
                                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                        backgroundColor: '#7F1425',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={8} display="flex" alignItems="center">
                                            <Typography variant="body1">Get Offer's Notifications</Typography>
                                        </Grid>
                                        <Grid item xs={4} display="flex" justifyContent="flex-end">
                                            <Switch
                                                checked={settings.offersNotifications}
                                                onChange={handleSettingChange}
                                                name="offersNotifications"
                                                sx={{
                                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                                        color: '#7F1425',
                                                    },
                                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                        backgroundColor: '#7F1425',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={8} display="flex" alignItems="center">
                                            <Typography variant="body1">Dark Mode</Typography>
                                        </Grid>
                                        <Grid item xs={4} display="flex" justifyContent="flex-end">
                                            <Switch
                                                checked={settings.darkMode}
                                                onChange={handleSettingChange}
                                                name="darkMode"
                                                sx={{
                                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                                        color: '#7F1425',
                                                    },
                                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                        backgroundColor: '#7F1425',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="outlined" color="primary">
                                                Log Out
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}
                            {/* Add content for other tabs here */}
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Profile;
