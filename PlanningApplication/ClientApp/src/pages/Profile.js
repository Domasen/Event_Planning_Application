import React, {useContext, useEffect, useState} from 'react';
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
import CalendarComponent from './CalendarComponent';
import {UserContext} from "../context/UserContext";
import axios from "axios";
import {Await} from "react-router-dom"; // Import the CalendarComponent

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

    
    
    const { user, setUser } = useContext(UserContext);
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
       // dateOfBirth: user.dateOfBirth,
        email: user.email,
        contactNumber: user.phone,
        description: 'Laisvalaikiu organizuoju nedideles apimties renginius, esu sukaupęs daugiau nei 3 metų darbo patirtį šioje srityje. Mėgstu dalyvauti įvairiuose renginiuose.',
        profilePicture: 'https://via.placeholder.com/120', // Placeholder for profile picture
    });
    const [date, setDate] = useState(user.dateOfBirth.split("T")[0]);
    const [tabValue, setTabValue] = useState(0); // Set default tab to "About me"
    const [settings, setSettings] = useState({
        eventNotifications: true,
        offersNotifications: false,
        darkMode: false,
    });

    const [photo, setPhoto] = React.useState(user.photo);
    const [uploadPhoto, setUploadPhoto] = React.useState(null);

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

    const handleSaveClick = async () => {
        const body = {
            id: user.id,
            email: formData.email,
            name: formData.name,
            surname: user.surname,
            phone: formData.contactNumber,
            dateOfBirth: date
                
        }

        try {
          var response = await axios.put(`User/user`, body);
          
          if(response.status === 200){
              console.log("Success")
          }else{
              console.error(response)
          }
        } catch (error) {
            console.error('Failed to update event', error);
        }
        setIsEditing(false);
    };
    
    
    
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setUploadPhoto(file);
        console.log(photo);
        
        
    };
    
    const uploadImage = async () => {
        if(uploadPhoto != null){
            try{
                const formData = new FormData();
                formData.append("photo", uploadPhoto)
                const response1 = await axios.post('User/uploadUserPhoto/'+user.id, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': '*/*'
                    }
                });
                console.log(response1.status);
                if (response1.status === 200) {
                    console.log("Success");
                    try {
                        const response = await axios.get('/User/currentUser', {
                            headers: {
                                'Content-Type': 'text/plain',
                            },
                        });
                        if (response.status === 200) {
                            setUser(response.data);
                            setPhoto(response.data.photo);
                        }
                    } catch (error) {
                        console.error('Failed to fetch user', error);
                    }
                }
            }catch (error){
                console.error('image failed', error);
            }
        }
    }
    
    useEffect(() =>{
        uploadImage();
    }, [uploadPhoto])

    
    
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
                                    src={`data:image/jpeg;base64,${photo}`}
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
                                            type="date"
                                            label="Date of Birth"
                                            value={date}
                                            onChange={(e)=>setDate(e.target.value)}
                                            margin="normal"
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
                                            Date of Birth: {date}
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
