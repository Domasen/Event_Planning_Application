import React, { useState, useEffect} from 'react';
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


export const EventCosts = () => {
    const id = "20E7CDFF-A0CC-4734-A033-092E398EF0CF"
    const [eventName, setEventName] = useState([]);
    const [totalBudget, setTotalBudget] = useState([]);
    const [currentCost, setCost] = useState([]);
    const [workList, setWorkList] = useState([]);
    const [open, setOpen] = useState(false);
    const [newExpense, setNewExpense] = useState([]);
    useEffect(() => {
        // Function to fetch employees
        const fetchCost = async () => {
            try {
                const response = await axios.get("Expense/CalculatePrice?eventId="+id);
                setCost(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchCost(); // Call the fetch function
    }, []); 
    useEffect(() => {
        // Function to fetch employees
        const fetchEvent = async () => {
            try {
                const response = await axios.get("Event/getEvent/"+id);
                setEventName(response.data.name);
                setTotalBudget(response.data.budget)
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvent(); // Call the fetch function
    }, []); 
    const fetchExpenses = async () => {
        try {
            const response = await axios.get('/Expense/GetByEvent?eventId='+id);
            setWorkList(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };
    useEffect(() => {

        fetchExpenses(); // Call the fetch function
    }, []); 
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
            newExpense.PlannedEvent = id
            const response = await axios.post('/Expense/Create', newExpense, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });

            if (response.status === 200) {
                // Reset form fields
                fetchExpenses();
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

    const remainingBudget = totalBudget - currentCost;

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
                    {eventName} - Event Costs
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Total Budget: ${totalBudget}
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
                                <TableCell component="th" scope="row">{work.name}</TableCell>
                                <TableCell align="right">{work.assignedEmployees.user.name + " " + work.assignedEmployees.user.surname}</TableCell>
                                <TableCell align="right">{work.hourlyRate}</TableCell>
                                <TableCell align="right">{work.hoursPlanned}</TableCell>
                                <TableCell align="right">{work.totalCost}</TableCell>
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
                    Total Cost: {currentCost}
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
