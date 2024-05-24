import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const EventCard = ({ event }) => {
    return (
        <Card sx={{ display: 'flex', mb: 2, alignItems: 'center', p: 2 }}>
            <CardMedia
                component="img"
                sx={{ width: 160, height: 120, borderRadius: 2 }}
                image={event.image}
                alt={event.title}
            />
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="h5" variant="h5">
                    {event.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {event.time}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {event.date}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {event.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {event.price}
                </Typography>
            </CardContent>
            <Button
                variant="contained"
                color="primary"
                sx={{ backgroundColor: '#7F1425', '&:hover': { backgroundColor: '#63101C' } }}
            >
                Invite
            </Button>
            <MoreVert />
        </Card>
    );
};

export default EventCard;
