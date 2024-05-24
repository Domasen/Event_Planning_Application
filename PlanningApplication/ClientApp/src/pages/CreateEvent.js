﻿import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Footer from '../components/Footer.js'; // Ensure the correct path is used

export const CreateEvent = () => {
    // Event registration states
    const [eventName, setEventName] = React.useState('');
    const [eventType, setEventType] = React.useState('');
    const [pricedEvent, setPricedEvent] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [date, setDate] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');
    const [eventFormat, setEventFormat] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [hashtags, setHashtags] = React.useState('');

    const handleEventSubmit = (e) => {
        e.preventDefault();

        const eventInfo = {
            name: eventName,
            type:eventType,
            isPaid:true,
            tiecketPrice: parseFloat(price).toFixed(2),
            date:date,
            location:location,
            startTime:startTime,
            endTime:endTime,
            format:eventFormat,
            description:description,
            hashtags:hashtags
        }

        try {
            const response = await axios.post('Event/createEvent', eventInfo, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });

            if (response.status === 200) {
                console.log("Success")  
            } else {
                console.error(response)  

            }
        } catch (error) {
            console.error('Login failed', error);
        }

        console.log('Event Created:', { eventName, eventType, pricedEvent, price, date, location, startTime, endTime, eventFormat, description, hashtags });
        // Reset form fields
        setEventName('');
        setEventType('');
        setPricedEvent('');
        setPrice('');
        setDate('');
        setLocation('');
        setStartTime('');
        setEndTime('');
        setEventFormat('');
        setDescription('');
        setHashtags('');
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
                <TextField
                    required
                    id="eventType"
                    label="Event Type"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: { color: 'white', borderRadius: '4px' },
                        sx: { '& fieldset': { borderColor: 'white' } }
                    }}
                />
                <TextField
                    id="pricedEvent"
                    label="Priced Event"
                    value={pricedEvent}
                    onChange={(e) => setPricedEvent(e.target.value)}
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
                    onChange={(e) => setPrice(parseFloat(e.target.value).toFixed(2))}
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
