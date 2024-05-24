import React, { useState } from 'react';
import { Box, Grid, Typography, ButtonGroup, Button } from '@mui/material';
import BookingCard from './BookingCard';

const initialBookings = [
    {
        id: 1,
        image: 'https://pickvibe-media.s3.eu-north-1.amazonaws.com/161096/conversions/6bad4066e33bd7b99cb760236811abc5-large.jpg',
        title: 'Tai kada vaikai?',
        time: 'Tr: 24',
        date: 'Balandžio 24',
        seatNumber: 'M02, N03',
        quantity: 2,
        location: 'Jurbarko kultūros centras',
        ticketPrice: '25€',
        convenienceFee: '0€',
        totalPaid: '25€',
        bookingID: 'WQ0036HQ'
    },
    {
        id: 2,
        image: 'https://renginiai.kasvyksta.lt/uploads/events/116783/thumb/gyvas_piesimas_fb.jpg',
        title: 'Piešimas gyvai',
        time: 'Penktadienis',
        date: 'Balandžio 26',
        seatNumber: 'K',
        quantity: 1,
        location: 'Klaipėda',
        ticketPrice: '0€',
        convenienceFee: '0€',
        totalPaid: '0€',
        bookingID: 'WQ0036HQ'
    },
    {
        id: 3,
        image: 'https://www.bilietai.lt/imageGenerator/eventDetails/db3ed572d38d4dd3d2785039f8c535c1.webp',
        title: 'Jessica Shy Kaunas',
        time: 'Penktadienis',
        date: 'Rugpjūčio 30',
        seatNumber: 'N',
        quantity: 1,
        location: 'Dariaus ir Girėno stadionas',
        ticketPrice: '50€',
        convenienceFee: '5€',
        totalPaid: '55€',
        bookingID: 'WQ0036HQ'
    }
];

const MyBookings = () => {
    const [bookings, setBookings] = useState(initialBookings);

    const handleCancelBooking = (id) => {
        setBookings(bookings.filter(booking => booking.id !== id));
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
                <Grid item>
                    <Typography variant="h6">Filter By:</Typography>
                    <Button variant="outlined" sx={{ ml: 2 }}>
                        Status
                    </Button>
                    <Button variant="outlined" sx={{ ml: 2 }}>
                        Organizer
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
            {bookings.map((booking, index) => (
                <Grid item xs={12} key={index}>
                    <BookingCard booking={booking} onCancel={handleCancelBooking} />
                </Grid>
            ))}
        </Box>
    );
};

export default MyBookings;
