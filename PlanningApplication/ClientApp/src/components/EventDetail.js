import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, TextField, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
import { EventContext } from '../context/EventContext';
import axios from 'axios';

const EventDetail = () => {
    const { id } = useParams();
    const { events, fetchEvents } = useContext(EventContext);

    // Define state variables
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [event, setEvent] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Fetch event data from context using useEffect
    useEffect(() => {
        const foundEvent = events?.find(event => event.id === id);
        if (foundEvent) {
            setEvent(foundEvent);
            setTitle(foundEvent.name);
            setTime(foundEvent.startTime);
            setDate(foundEvent.date);
            setLocation(foundEvent.location);
            setPrice(foundEvent.ticketPrice);
            setPhoto(foundEvent.photo);
        }
    }, [events, id]);

    // Handle save event
    const handleSave = () => {
        const updateEvent = async (updatedEvent) => {
            try {
                const response = await axios.put(`Event/updateEvent/${updatedEvent.id}`, updatedEvent);
                if (response.status === 200) {
                    fetchEvents();
                    setSnackbarMessage("Event updated successfully.");
                    setSnackbarOpen(true);
                } else {
                    console.error("Failed." + response);
                }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    setOpenDialog(true);
                } else {
                    console.error('Failed to update event', error);
                }
            }
        };

        updateEvent({
            ...event,
            id: event.id,
            name: title,
            startTime: time,
            date: date,
            location: location,
            ticketPrice: price,
            photo: photo
        });
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleOverwrite = async () => {
        try {
            const response = await axios.put(`Event/updateEvent/${event.id}`, {
                ...event,
                id: event.id,
                name: title,
                startTime: time,
                date: date,
                location: location,
                ticketPrice: price,
                photo: photo,
                forceUpdate: true // Assuming your backend handles a force update parameter
            });
            if (response.status === 200) {
                fetchEvents();
                setSnackbarMessage("Event updated successfully.");
                setSnackbarOpen(true);
                setOpenDialog(false);
            }
        } catch (error) {
            console.error('Failed to overwrite event', error);
        }
    };

    const handlePullLatest = async () => {
        try {
            const response = await axios.get(`Event/getEvent/${event.id}`);
            if (response.status === 200) {
                const updatedEvent = response.data;
                setEvent(updatedEvent);
                setTitle(updatedEvent.name);
                setTime(updatedEvent.startTime);
                setDate(updatedEvent.date);
                setLocation(updatedEvent.location);
                setPrice(updatedEvent.ticketPrice);
                setPhoto(updatedEvent.photo);
                setOpenDialog(false);
            }
        } catch (error) {
            console.error('Failed to pull latest event data', error);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
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
                image={`data:image/jpeg;base64,${event.photo}`}
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

            {/* Conflict Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Conflict Detected"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        A conflict was detected while updating the event. Would you like to overwrite the existing data or pull the latest data and retry editing?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOverwrite} color="primary">
                        Overwrite
                    </Button>
                    <Button onClick={handlePullLatest} color="primary" autoFocus>
                        Pull Latest
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for success message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default EventDetail;
