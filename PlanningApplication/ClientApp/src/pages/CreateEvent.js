import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Footer from '../components/Footer.js'; // Ensure the correct path is used
import axios from 'axios';
import EventTypeSelect from "../components/EventTypesSelect.js"
import EventCategoriesMultiSelect from '../components/EventCategoriesMultiSelect.js';
import { UserContext } from '../context/UserContext.js';
import {Await} from "react-router-dom";


export const CreateEvent = () => {
    const { user } = React.useContext(UserContext); 
    // Event registration states
    const [eventName, setEventName] = React.useState('');
    const [eventType, setEventType] = React.useState('');
    const [budget, setBudget] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [date, setDate] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');
    const [eventFormat, setEventFormat] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [hashtags, setHashtags] = React.useState('');
    const [categories, setCategories] = React.useState([])
    const [photo, setPhoto] = React.useState(null)


    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };
    
    
    const handleEventSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            throw new Error("User object is not defined, is null or has no id.");
        }
        
        
        const eventInfo = {
            name: eventName,
            type:eventType,
            budget:budget,
            ticketPrice: price,
            date:date,
            location:location,
            startTime:startTime,
            endTime:endTime,
            format:eventFormat,
            description: description,
            categories: categories.map(category => category.name),
            hashtags: hashtags,
            userId: user.id
        }

        try {
            const response = await axios.post('Event/createEvent', eventInfo, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });

            if (response.status === 201) {
                console.log("Success")
                
                
            } else {
                console.error(response)  

            }

            const formData = new FormData();
            formData.append("photo", photo)
            const response1 = await axios.post('Event/uploadEventPhoto/'+response.data.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': '*/*'
                }
            });

            if (response1.status === 200) {
                console.log("Success")


            } else {
                console.error(response)

            }
        } catch (error) {
            console.error('image failed', error);
        }

        console.log('Event Created:', { eventName, eventType, budget, price, date, location, startTime, endTime, eventFormat, description, hashtags });
        // Reset form fields
        setEventName('');
        setEventType('');
        setBudget('');
        setPrice('');
        setDate('');
        setLocation('');
        setStartTime('');
        setEndTime('');
        setEventFormat('');
        setDescription('');
        setHashtags('');
        setCategories([]);
        setPhoto(null);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                minHeight: '100vh',
                width: '100%',
                backgroundColor: '#f5f5f5',
                p: 3,
                position: 'relative',
            }}
        >
            <Box
                component="form"
                sx={{
                    background: 'linear-gradient(135deg, #4B0611 30%, #8B565E 90%)',
                    color: 'white',
                    p: 4,
                    borderRadius: 2,
                    width: '80%', // Ensure the form spans 80% of the width
                    marginTop: 3,
                    boxShadow: '2px 2px 12px rgba(0,0,0,0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignSelf: 'center', // Center the form horizontally
                    marginBottom: '40px', // Add space at the bottom
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleEventSubmit}
            >
                <Typography variant="h4" gutterBottom>
                    Create an Event
                </Typography>
                <TextField
                    required
                    id="eventName"
                    label="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: { color: 'white', borderRadius: '4px' },
                        sx: { '& fieldset': { borderColor: 'white' } }
                    }}
                />
                <EventTypeSelect eventType={eventType} setEventType={setEventType} />
                <EventCategoriesMultiSelect categories={categories} setCategories={setCategories} />
                <TextField
                    id="budget"
                    label="Budget"
                    value={budget}
                    type="number"
                    onChange={(e) => setBudget(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: { color: 'white', borderRadius: '4px' },
                        sx: { '& fieldset': { borderColor: 'white' } }
                    }}
                />
                <TextField
                    id="price"
                    label="Price €"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: { color: 'white', borderRadius: '4px' },
                        sx: { '& fieldset': { borderColor: 'white' } }
                    }}
                />
                <TextField
                    id="date"
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: { color: 'white', borderRadius: '4px' },
                        sx: { '& fieldset': { borderColor: 'white' } }
                    }}
                    InputLabelProps={{
                        shrink: true, // Keeps the label visible when the field is focused
                        style: { color: 'white' }
                    }}
                />
                <TextField
                    id="location"
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: { color: 'white', borderRadius: '4px' },
                        sx: { '& fieldset': { borderColor: 'white' } }
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <TextField
                        id="startTime"
                        label="Start Time"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        margin="normal"
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{
                            style: { color: 'white', borderRadius: '4px' },
                            sx: { '& fieldset': { borderColor: 'white' } }
                        }}
                        sx={{ width: '48%' }}
                    />
                    <TextField
                        id="endTime"
                        label="End Time"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        margin="normal"
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{
                            style: { color: 'white', borderRadius: '4px' },
                            sx: { '& fieldset': { borderColor: 'white' } }
                        }}
                        sx={{ width: '48%' }}
                    />
                </Box>
                <TextField
                    id="eventFormat"
                    label="Event Format"
                    value={eventFormat}
                    onChange={(e) => setEventFormat(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: { color: 'white', borderRadius: '4px' },
                        sx: { '& fieldset': { borderColor: 'white' } }
                    }}
                />
                <TextField
                    id="description"
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: { color: 'white', borderRadius: '4px' },
                        sx: { '& fieldset': { borderColor: 'white' } }
                    }}
                />
                <TextField
                    id="hashtags"
                    label="Hashtags"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: { color: 'white', borderRadius: '4px' },
                        sx: { '& fieldset': { borderColor: 'white' } }
                    }}
                />
                <input
                    type="file"
                    accept="image/*"
                    // value={photo}
                    onChange={handlePhotoChange}
                    style={{ margin: '20px 0', color: 'white' }}
                />
                <Button
                    variant="contained"
                    sx={{
                        mt: 2,
                        backgroundColor: '#7F1425',
                        '&:hover': {
                            backgroundColor: '#63101C'
                        }
                    }}
                    type="submit"
                >
                    Save & Continue
                </Button>
            </Box>
        </Box>
    );
};
