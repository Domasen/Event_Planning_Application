import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, TextField, Button, Box } from '@mui/material';
import { useEventContext } from '../context/EventContext';

const EventDetail = () => {
    const { id } = useParams();
    const { events, updateEvent } = useEventContext();

    // Define state variables
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [event, setEvent] = useState(null);

    // Fetch event data from context using useEffect
    useEffect(() => {
        const foundEvent = events?.find(event => event.id === parseInt(id));
        if (foundEvent) {
            setEvent(foundEvent);
            setTitle(foundEvent.title);
            setTime(foundEvent.time);
            setDate(foundEvent.date);
            setLocation(foundEvent.location);
            setPrice(foundEvent.price);
        }
    }, [events, id]);

    // Handle save event
    const handleSave = () => {
        updateEvent({ ...event, title, time, date, location, price });
    };

    // If event is not found, display message
    if (!event) {
        return <Typography variant="h6">Event not found</Typography>;
    }

    // Render event details
    return (
        <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
            <CardMedia
                component="img"
                height="200"
                image={event.image}
                alt={title}
            />
            <CardContent>
                {/* Render form fields for event details */}
                <Typography variant="h5" component="div">
                    {/* Title field */}
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {/* Time field */}
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {/* Date field */}
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {/* Location field */}
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {/* Price field */}
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                    {/* Save button */}
                    <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: '#7F1425', '&:hover': { backgroundColor: '#63101C' } }}>
                        Save
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default EventDetail;
