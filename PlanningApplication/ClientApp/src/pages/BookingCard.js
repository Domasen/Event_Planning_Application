import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Download } from '@mui/icons-material';
import jsPDF from 'jspdf';

const BookingCard = ({ booking, onCancel }) => {
    const handleDownloadPDF = () => {
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Create a promise to handle image loading
        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.src = src;
                img.onload = () => resolve(img);
                img.onerror = (err) => reject(err);
            });
        };

        // Load the image
        loadImage(booking.image).then((image) => {
            const imgWidth = 50;
            const imgHeight = (image.height * imgWidth) / image.width;

            // Determine the image format and normalize it
            let imageFormat = booking.image.split('.').pop().toUpperCase();
            if (imageFormat === 'JPG' || imageFormat === 'JPEG') {
                imageFormat = 'JPEG';
            } else if (imageFormat === 'PNG') {
                imageFormat = 'PNG';
            } else if (imageFormat === 'WEBP') {
                imageFormat = 'WEBP';
            } else {
                imageFormat = 'JPEG'; // Default to JPEG if format is unknown
            }

            // Add event image
            pdf.addImage(image, imageFormat, 10, 10, imgWidth, imgHeight);

            // Add booking details beside the image
            let xOffset = imgWidth + 20;
            let yOffset = 10;

            pdf.setFontSize(16);
            pdf.setTextColor('#7F1425');
            pdf.text(booking.title, xOffset, yOffset + 10);

            pdf.setFontSize(12);
            pdf.setTextColor('#000000');
            pdf.text(`Date: ${booking.date}`, xOffset, yOffset + 20);
            pdf.text(`Time: ${booking.time}`, xOffset, yOffset + 30);
            pdf.text(`Location: ${booking.location}`, xOffset, yOffset + 40);
            pdf.text(`Price: ${booking.ticketPrice}`, xOffset, yOffset + 50);
            pdf.text(`Convenience fee + Taxes: ${booking.convenienceFee}`, xOffset, yOffset + 60);
            pdf.text(`Total paid: ${booking.totalPaid}`, xOffset, yOffset + 70);
            pdf.text(`Booking ID: ${booking.bookingID}`, xOffset, yOffset + 80);

            pdf.save(`${booking.title}_booking.pdf`);
        }).catch((error) => {
            console.error('Error loading image:', error);
        });
    };

    return (
        <Card sx={{ display: 'flex', mb: 2, alignItems: 'center', p: 2, backgroundColor: '#f0f0f0', borderRadius: 2 }}>
            <CardMedia
                component="img"
                sx={{ width: 160, height: 120, borderRadius: 2 }}
                image={booking.image}
                alt={booking.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto', ml: 2 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="h5" variant="h5">
                        {booking.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {booking.time}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {booking.date}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Seat number: {booking.seatNumber}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Quantity: {booking.quantity}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {booking.location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Ticket Price: {booking.ticketPrice}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Convenience fee + Taxes: {booking.convenienceFee}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Total paid: {booking.totalPaid}
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 2 }}>
                <Typography variant="body2" color="textSecondary">
                    Booking ID: {booking.bookingID}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Download />}
                    sx={{ backgroundColor: '#7F1425', '&:hover': { backgroundColor: '#63101C' }, mt: 1 }}
                    onClick={handleDownloadPDF}
                >
                    Download PDF
                </Button>
                <Button
                    variant="text"
                    color="secondary"
                    sx={{ mt: 1 }}
                    onClick={() => onCancel(booking.id)}
                >
                    Cancel Booking
                </Button>
            </Box>
        </Card>
    );
};

export default BookingCard;
