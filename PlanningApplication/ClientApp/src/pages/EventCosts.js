import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Footer from '../components/Footer.js'; // Ensure the correct path is used

// Hardcoded data
const eventData = {
    eventName: 'Summer Festival',
    totalBudget: 5000,
};


export const EventCosts = () => {
    const [workList, setWorkList] = useState("");
    const [open, setOpen] = useState(false);
    const [newExpense, setNewExpense] = useState({ jobName: '', assignedEmployee: '', hourlyRate: '', hoursWorked: '' });
    axios.get('Expense/GetByEvent?eventId=606812f4-1973-4c11-9a1d-605b3bb2d120').then((getResponse) => setWorkList(getResponse.data))
    console.log(workList)
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewExpense({ ...newExpense, [name]: value });
    };

    const handleAddExpense = async () => {
        try {
            const response = await axios.post('/expense/Create', newExpense, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });

            if (response.status === 200) {
                // Reset form fields
                setWorkList([...workList, newExpense]);
                handleClose();
            } else {
                console.log(response.data.message || 'Expense addition failed. Please try again.');
            }
        }
        catch (error) {
            console.error('Expense addition failed', error);
            //setError('Employee addition failed. Please try again.');
        }
    };

    const remainingBudget = eventData.totalBudget;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between', // Ensure space between content and footer
                minHeight: '100vh',
                width: '100%',
                backgroundColor: '#f5f5f5',
                p: 3,
            }}
        >
            <Box sx={{ width: '80%', textAlign: 'center', mt: 3 }}>
                <Typography variant="h4" gutterBottom>
                    {eventData.eventName} - Event Costs
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Total Budget: ${eventData.totalBudget}
                </Typography>
            </Box>
            <TableContainer component={Paper} sx={{ width: '80%', mb: '20px' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                            <TableCell>Job Name</TableCell>
                            <TableCell align="right">Assigned Employee</TableCell>
                            <TableCell align="right">Hourly Rate ($)</TableCell>
                            <TableCell align="right">Hours Worked</TableCell>
                            <TableCell align="right">Total Cost ($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workList.map((work, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">{work.jobName}</TableCell>
                                <TableCell align="right">{work.assignedEmployee}</TableCell>
                                <TableCell align="right">{work.hourlyRate}</TableCell>
                                <TableCell align="right">{work.hoursWorked}</TableCell>
                                <TableCell align="right">{work.hourlyRate * work.hoursWorked}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ width: '80%', display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#7F1425' }}>
                    Remaining Budget: ${remainingBudget >= 0 ? remainingBudget : 0}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Total Cost: ${axios.get("Expense/CalculatePrice?eventId=606812f4-1973-4c11-9a1d-605b3bb2d120").data}
                </Typography>
            </Box>
            <Box sx={{ width: '80%', textAlign: 'center', mb: 3 }}>
                <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#7F1425', color: 'white' }}>
                    Add Custom Expense
                </Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                        Add Custom Expense
                    </Typography>
                    <TextField
                        label="Job Name"
                        name="jobName"
                        value={newExpense.jobName}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Assigned Employee"
                        name="assignedEmployee"
                        value={newExpense.assignedEmployee}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Hourly Rate ($)"
                        name="hourlyRate"
                        value={newExpense.hourlyRate}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Hours Worked"
                        name="hoursWorked"
                        value={newExpense.hoursWorked}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleAddExpense} sx={{ backgroundColor: '#7F1425', color: 'white' }}>
                        Add Expense
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default EventCosts;
