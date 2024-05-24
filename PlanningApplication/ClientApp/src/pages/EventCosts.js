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
import TextField from '@mui/material/TextField';
import Footer from '../components/Footer.js';

// Hardcoded data
const eventData = {
    eventName: 'Summer Festival',
    totalBudget: 5000,
};

const initialWorkList = [
    { jobName: 'Setup Stage', assignedEmployee: 'John Doe', hourlyRate: 15, hoursWorked: 5 },
    { jobName: 'Sound Check', assignedEmployee: 'Jane Smith', hourlyRate: 20, hoursWorked: 3 },
    { jobName: 'Lighting Setup', assignedEmployee: 'Alex Johnson', hourlyRate: 18, hoursWorked: 4 },
];

export const EventCosts = () => {
    const [workList, setWorkList] = useState(initialWorkList);
    const [open, setOpen] = useState(false);
    const [newExpense, setNewExpense] = useState({ jobName: '', assignedEmployee: '', hourlyRate: '', hoursWorked: '' });

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

    const handleAddExpense = () => {
        setWorkList([...workList, newExpense]);
        handleClose();
    };

    const calculateTotalCost = () => {
        let totalCost = 0;
        workList.forEach((work) => {
            totalCost += work.hourlyRate * work.hoursWorked;
        });
        return totalCost;
    };

    const remainingBudget = eventData.totalBudget - calculateTotalCost();

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
            <Box sx={{ width: '80%', display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Remaining Budget: ${remainingBudget >= 0 ? remainingBudget : 0}
                </Typography>
            </Box>
            <Box sx={{ width: '80%', textAlign: 'center', mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Total Cost: ${calculateTotalCost()}
                </Typography>
                <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#7F1425', color: 'white', mt: 2 }}>
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
