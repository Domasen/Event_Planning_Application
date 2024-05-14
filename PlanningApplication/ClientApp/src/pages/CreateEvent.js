import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Footer from '../components/Footer.js'; // Ensure the correct path is used

export const CreateEvent = () => {
    // Employee registration states
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [position, setPosition] = React.useState('');
    const [hourlyRate, setHourlyRate] = React.useState('');
    const [employeeFormVisible, setEmployeeFormVisible] = React.useState(false);

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

    const handleEmployeeSubmit = (e) => {
        e.preventDefault();
        console.log('Employee Registered:', { name, email, position, hourlyRate });
        // Reset form fields
        setName('');
        setEmail('');
        setPosition('');
        setHourlyRate('');
        setEmployeeFormVisible(false); // Hide the form after submission
    };

    const handleEventSubmit = (e) => {
        e.preventDefault();
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

    const toggleEmployeeFormVisibility = () => {
        setEmployeeFormVisible(!employeeFormVisible);
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
            <Button
                variant="contained"
                onClick={toggleEmployeeFormVisibility}
                sx={{
                    backgroundColor: '#7F1425',
                    '&:hover': {
                        backgroundColor: '#63101C'
                    },
                    mb: 2
                }}
            >
                Register Employee
            </Button>

            {employeeFormVisible && (
                <Box
                    component="form"
                    sx={{
                        background: 'linear-gradient(135deg, #4B0611 30%, #8B565E 90%)',
                        color: 'white',
                        p: 4,
                        borderRadius: 2,
                        maxWidth: '500px',
                        marginTop: 3,
                        boxShadow: '2px 2px 12px rgba(0,0,0,0.4)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '20px', // Add space at the bottom
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleEmployeeSubmit}
                >
                    <Typography variant="h4" gutterBottom>
                        Employee Registration
                    </Typography>
                    <TextField
                        required
                        id="name"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        id="position"
                        label="Position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
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
                        id="hourly_rate"
                        label="Hourly Rate"
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
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
                        Register
                    </Button>
                </Box>
            )}

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

            <Footer /> 
        </Box>
    );
};
