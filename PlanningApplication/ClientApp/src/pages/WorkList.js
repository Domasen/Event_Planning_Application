import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Footer from '../components/Footer.js'; // Ensure the correct path is used

export const WorkList = () => {
    // Predefined employee and event states
    const [employees, setEmployees] = React.useState([
        { name: 'John Doe' },
        { name: 'Jane Smith' },
    ]);

    const [eventList, setEventList] = React.useState([
        { eventName: 'Event 1' },
        { eventName: 'Event 2' },
    ]);

    // Work registration states
    const [jobName, setJobName] = React.useState('');
    const [assignedEmployee, setAssignedEmployee] = React.useState('');
    const [hoursPlanned, setHoursPlanned] = React.useState('');
    const [workList, setWorkList] = React.useState([]);
    const [currentEvent, setCurrentEvent] = React.useState('');

    const handleJobSubmit = (e) => {
        e.preventDefault();
        const newWork = { jobName, assignedEmployee, hoursPlanned, currentEvent };
        setWorkList([...workList, newWork]);
        setJobName('');
        setAssignedEmployee('');
        setHoursPlanned('');
        setCurrentEvent('');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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
                    width: '80%',
                    marginTop: 3,
                    boxShadow: '2px 2px 12px rgba(0,0,0,0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '40px',
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleJobSubmit}
            >
                <Typography variant="h4" gutterBottom>
                    Add Work
                </Typography>
                <TextField
                    required
                    id="jobName"
                    label="Job Name"
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: { color: 'white', borderRadius: '4px' },
                        sx: { '& fieldset': { borderColor: 'white' } }
                    }}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="assignedEmployee-label" sx={{ color: 'white' }}>Responsible Employee</InputLabel>
                    <Select
                        labelId="assignedEmployee-label"
                        id="assignedEmployee"
                        value={assignedEmployee}
                        label="Responsible Employee"
                        onChange={(e) => setAssignedEmployee(e.target.value)}
                        sx={{
                            color: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            }
                        }}
                    >
                        {employees.map((employee, index) => (
                            <MenuItem key={index} value={employee.name}>
                                {employee.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    required
                    id="hoursPlanned"
                    label="Number of Hours Planned"
                    type="number"
                    value={hoursPlanned}
                    onChange={(e) => setHoursPlanned(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{
                        style: { color: 'white', borderRadius: '4px' },
                        sx: { '& fieldset': { borderColor: 'white' } }
                    }}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="event-label" sx={{ color: 'white' }}>Event</InputLabel>
                    <Select
                        labelId="event-label"
                        id="event"
                        value={currentEvent}
                        label="Event"
                        onChange={(e) => setCurrentEvent(e.target.value)}
                        sx={{
                            color: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            }
                        }}
                    >
                        {eventList.map((event, index) => (
                            <MenuItem key={index} value={event.eventName}>
                                {event.eventName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
                    Add Work
                </Button>
            </Box>

            {/* Added Work List */}
            <TableContainer component={Paper} sx={{ mt: 3, width: '80%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Job Name</TableCell>
                            <TableCell>Assigned Employee</TableCell>
                            <TableCell>Hours Planned</TableCell>
                            <TableCell>Event</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workList.length > 0 ? (
                            workList.map((work, index) => (
                                <TableRow key={index}>
                                    <TableCell>{work.jobName}</TableCell>
                                    <TableCell>{work.assignedEmployee}</TableCell>
                                    <TableCell>{work.hoursPlanned}</TableCell>
                                    <TableCell>{work.currentEvent}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No work added.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
