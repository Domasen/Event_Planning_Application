import React from 'react';
import { Box, Grid, Typography, ButtonGroup, Button } from '@mui/material';
import EventCard from './EventCard';

const events = [
    {
        image: 'https://rocketscience.lt/wp-content/uploads/2023/01/Skaitmeninio-marketingo-ivadas_Rocket_Science_Baltics.jpg',
        title: 'Marketingo apžvalga',
        time: '18:00',
        date: 'Penktadienis, Birželio 7',
        location: 'Vilnius',
        price: 'Free'
    },
    {
        image: 'https://static.canva.com/anon_home/og-image-1200x630.jpg',
        title: 'Canva mokymai',
        time: '14:30',
        date: 'Trečiadienis, Birželio 3',
        location: 'Ukmergės kultūros centras',
        price: '10€'
    },
    {
        image: 'https://www.lrt.lt/img/2018/12/06/281758-715944-1287x836.jpg',
        title: 'Piešimo terapija',
        time: '8:00',
        date: 'Penktadienis, Gegužės 31',
        location: 'Šiaulių seminarija',
        price: 'Free'
    }
];

const MyEvents = () => {
    return (
        <Box sx={{ mt: 4 }}>
            <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
                <Grid item>
                    <Typography variant="h6">Filter By:</Typography>
                    <Button variant="outlined" sx={{ ml: 2 }}>
                        Status
                    </Button>
                </Grid>
                <Grid item>
                    <Typography variant="h6">Sort By:</Typography>
                    <ButtonGroup variant="outlined" sx={{ ml: 2 }}>
                        <Button>Date</Button>
                        <Button>Location</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            {events.map((event, index) => (
                <EventCard key={index} event={event} />
            ))}
        </Box>
    );
};

export default MyEvents;
