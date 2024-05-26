import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Pakeitėme useHistory į useNavigate

const EventCard = ({ event }) => {
    const navigate = useNavigate(); // Sukurkite navigate funkciją

    const handleUpdateClick = () => {
        // Nukreipkite vartotoją į EventDetail puslapį su renginio ID
        navigate(`/event/${event.id}`);
    };
    const handleCostClick = () => {
        // Nukreipkite vartotoją į EventDetail puslapį su renginio ID
        navigate(`/eventCosts/${event.id}`);
    };

    return (
        <Card sx={{ display: 'flex', mb: 2, alignItems: 'center', p: 2 }}>
            <CardMedia
                component="img"
                sx={{ width: 160, height: 120, borderRadius: 2 }}
                image={`data:image/jpeg;base64,${event.photo}`}
                alt={event.name}
            />
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="h5" variant="h5">
                    {event.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {event.startTime}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {event.date.split("T")[0]}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {event.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {event.ticketPrice}
                </Typography>
            </CardContent>
            <Button
                variant="contained"
                color="primary"
                sx={{ backgroundColor: '#7F1425', '&:hover': { backgroundColor: '#63101C' } }}
                onClick={handleUpdateClick} // Pridėkite paspaudimo tvarkyklę
            >
                UPDATE
            </Button>
            <Button
                variant="contained"
                color="primary"
                sx={{ backgroundColor: '#7F1425', '&:hover': { backgroundColor: '#63101C' }, marginLeft:'10px' }}
                onClick={handleCostClick} // Pridėkite paspaudimo tvarkyklę
            >
                COSTS
            </Button>
            <MoreVert />
        </Card>
    );
};

export default EventCard;
