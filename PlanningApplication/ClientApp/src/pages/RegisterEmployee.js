import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import Footer from '../components/Footer.js'; // Ensure the correct path is used

export const RegisterEmployee = () => {
    // Employee registration states
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [position, setPosition] = React.useState('');
    const [hourlyRate, setHourlyRate] = React.useState('');
    const [employees, setEmployees] = React.useState([]);

    const handleEmployeeSubmit = async (e) => {
        e.preventDefault();
        console.log('Employee Registered:', { name, email, position, hourlyRate });
        const employeeData = {
            name,
            email,
            position,
            hourlyRate
        };
        try {
            const response = await axios.post('/employee/Create', employeeData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            if (response.status === 200) {
                // Reset form fields
                setName('');
                setEmail('');
                setPosition('');
                setHourlyRate('');
            } else {
                console.log(response.data.message || 'Employee addition failed. Please try again.');
            }
        }
        catch (error) {
            console.error('Employee addition failed', error);
            //setError('Employee addition failed. Please try again.');
        }
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

            <TableContainer component={Paper} sx={{ mt: 3, width: '80%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Hourly Rate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.length > 0 ? (
                            employees.map((employee, index) => (
                                <TableRow key={index}>
                                    <TableCell>{employee.name}</TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>{employee.position}</TableCell>
                                    <TableCell>{employee.hourlyRate}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No employees registered.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
