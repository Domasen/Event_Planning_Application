import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
    Box, Button, Typography, Modal, Paper, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { format } from 'date-fns';


//const events = [
//    { date: new Date(2024, 0, 10), title: 'Event 1', description: 'Description for Event 1', location: 'Location 1' },
//    { date: new Date(2024, 1, 20), title: 'Event 2', description: 'Description for Event 2', location: 'Location 2' },
//    { date: new Date(2024, 2, 15), title: 'Event 3', description: 'Description for Event 3', location: 'Location 3' }
//];

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [open, setOpen] = useState(false);
    const [events, setEvents] = useState([])

    useEffect(() => {
        axios.get('Event/getAllUserEvents', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        }).then(response => {
            if (response.status === 200) {
                setEvents(response.data)
            }
            else {
                console.error(response)
            }
        })
    }, []);

    const handleDownloadPDF = () => {
        const input = document.getElementById('calendar');
        html2canvas(input).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Calendar_${date.getFullYear()}.pdf`);
        });
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            let localDate = format(date, 'yyyy-MM-dd') + "T00:00:00"
            const event = events.find(event => event.date === localDate);
            return event ? (
                <Typography sx={{ color: '#7F1425', cursor: 'pointer' }} onClick={() => handleOpen(event)}>
                    {event.name}
                </Typography>
            ) : null;
        }
    };

    const handleOpen = (event) => {
        setSelectedEvent(event);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ mt: 4, textAlign: 'center', width: '100%' }}>
            <Typography variant="h4">2024 Calendar</Typography>
            <Box id="calendar" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Calendar
                    value={date}
                    onChange={setDate}
                    tileContent={tileContent}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, width: '100%' }}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#7F1425', '&:hover': { backgroundColor: '#63101C' }, ml: '5cm' }}
                    onClick={handleDownloadPDF}
                >
                    Download PDF
                </Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', p: 4, width: 400 }}>
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {selectedEvent && (
                        <>
                            <Typography id="modal-title" variant="h6" component="h2">
                                {selectedEvent.name}
                            </Typography>
                            <Typography id="modal-description" sx={{ mt: 2 }}>
                                {selectedEvent.description}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                Location: {selectedEvent.location}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                Date: {selectedEvent.date.split('T')[0]}
                            </Typography>
                        </>
                    )}
                </Paper>
            </Modal>
        </Box>
    );
};

export default CalendarComponent;
