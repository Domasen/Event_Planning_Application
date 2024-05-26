import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Footer from '../components/Footer'; 

const EventCosts = () => {
    const { id } = useParams(); 
    const [strategy, setStrategy] = useState('TaxedStrategy');
    const [ensureChange, change] = useState(0);
    const [eventName, setEventName] = useState('');
    const [totalBudget, setTotalBudget] = useState(0);
    const [currentCost, setCost] = useState(0);
    const [workList, setWorkList] = useState([]);
    const [open, setOpen] = useState(false);
    const [newExpense, setNewExpense] = useState({ jobName: '', assignedEmployee: '', hourlyRate: '', hoursWorked: '' });

    const fetchCost = async () => {
        try {
            const response = await axios.get(`Expense/CalculatePrice?eventId=${id}&strategy=${strategy}`);
            setCost(response.data);
        } catch (error) {
            console.error('Error fetching event cost:', error);
        }
    };
    useEffect(() => {
       
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`Event/getEvent/${id}`);
                setEventName(response.data.name);

                setTotalBudget(response.data.budget);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };

        fetchEvent(); 
    }, [id]);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`/Expense/GetByEvent?eventId=${id}&strategy=${strategy}`);
            setWorkList(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };
    const updateCalculation = async () => {
        try {
            const response = await axios.put(`/Expense/UpdateCalculation?eventId=${id}&strategy=${strategy}`);
            setWorkList(response.data);
        } catch (error) {
            console.error('Error updating strategy:', error);
        }
        change(ensureChange+1)
    };
    const handleChangeStrategy = async () => {
        const newStrategy = strategy === "TaxedStrategy" ? "FlatStrategy" : "TaxedStrategy";
        setStrategy(newStrategy);
    };

    useEffect(() => {
        updateCalculation();
        fetchExpenses();
        fetchCost();
    }, [id]);

    useEffect(() => {
        updateCalculation();
    }, [strategy]);
    useEffect(() => {
        fetchCost();
    }, [ensureChange])
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
            const expenseToAdd = { ...newExpense, PlannedEvent: id, Strategy: strategy };
            const response = await axios.post('/Expense/Create', expenseToAdd, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });

            if (response.status === 200) {
                // Reset form fields
                setNewExpense({ jobName: '', assignedEmployee: '', hourlyRate: '', hoursWorked: '' });
                fetchExpenses();
                fetchCost();
                handleClose();
            } else {
                console.log(response.data.message || 'Expense addition failed. Please try again.');
            }
        } catch (error) {
            console.error('Expense addition failed', error);
        }
    };

    const remainingBudget = totalBudget - currentCost;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                    Total Budget: ${totalBudget.toFixed(2)}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Current Calculation type: {strategy === "TaxedStrategy" ? "Taxes included" : "Taxes excluded"}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: '#7F1425', '&:hover': { backgroundColor: '#63101C' } }}
                    onClick={handleChangeStrategy}
                >
                    Change Calculation type
                </Button>
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
                                <TableCell align="right">{`${work.assignedEmployees.user.name} ${work.assignedEmployees.user.surname}`}</TableCell>
                                <TableCell align="right">{work.hourlyRate}</TableCell>
                                <TableCell align="right">{work.hoursPlanned}</TableCell>
                                <TableCell align="right">{work.totalCost.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ width: '80%', display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#7F1425' }}>
                    Remaining Budget: ${remainingBudget >= 0 ? remainingBudget.toFixed(2) : 0}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Total Cost: ${currentCost.toFixed(2)}
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
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
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
            <Footer />
        </Box>
    );
};

export default EventCosts;