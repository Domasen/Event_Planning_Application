import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <Box
            sx={{
                width: '100%', // Ensure it spans the full width
                backgroundColor: '#4B0611',
                color: 'white',
                p: 4,
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                position: 'relative', // Ensure it stays in flow
            }}
        >
            <Box sx={{ minWidth: '200px', m: 2 }}>
                <Typography variant="h6" gutterBottom>
                    About us
                </Typography>
                <Typography>Leadership</Typography>
                <Typography>Our Mission</Typography>
                <Typography>Our Vision</Typography>
                <Typography>Features</Typography>
                <Typography>Career At</Typography>
            </Box>
            <Box sx={{ minWidth: '200px', m: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Contact us
                </Typography>
                <Typography>Mail us at EventTribe@Gmail.com</Typography>
                <Typography>Contact at 1234567890</Typography>
                <Typography>0987654321</Typography>
                <Typography>Press</Typography>
                <Typography>Blogs</Typography>
            </Box>
            <Box sx={{ minWidth: '200px', m: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Help & Support
                </Typography>
                <Typography>Customer Support</Typography>
                <Typography>Organizer Support</Typography>
                <Typography>Terms of Service</Typography>
                <Typography>Conditions of Service</Typography>
                <Typography>Privacy Policy</Typography>
                <Typography>Report a scam</Typography>
            </Box>
            <Box sx={{ minWidth: '200px', m: 2 }}>
                <Typography variant="h6" gutterBottom>
                    For regular event updates
                </Typography>
                <TextField
                    placeholder="Enter your mail id here."
                    variant="outlined"
                    size="small"
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: 1,
                        input: { color: 'black' },
                        mb: 2
                    }}
                />
                <Box>
                    <IconButton sx={{ color: 'white' }} href="https://www.facebook.com">
                        <FaFacebook />
                    </IconButton>
                    <IconButton sx={{ color: 'white' }} href="https://www.twitter.com">
                        <FaTwitter />
                    </IconButton>
                    <IconButton sx={{ color: 'white' }} href="https://www.instagram.com">
                        <FaInstagram />
                    </IconButton>
                    <IconButton sx={{ color: 'white' }} href="https://www.whatsapp.com">
                        <FaWhatsapp />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
                <Typography>
                    ©Cherry On Top
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
