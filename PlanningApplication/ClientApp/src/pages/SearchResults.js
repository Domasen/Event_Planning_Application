import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { FilterSidebar } from '../components/FilterSidebar';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export const SearchResults = () => {
    const query = useQuery();
    const search = query.get('searchValue');
    const [searchResults, setSearchResults] = useState([]);

    const fetchEventsBySearch = async (parameters = "") => {
        try {
            const response = await axios.get('Event/optimisticSearch?searchValue=' + parameters, {
                headers: {
                    'Accept': '*/*'
                }
            });
            if (response.status === 200) {
                setSearchResults(response.data);
                console.log("success");
            } else {
                console.log('Failed to fetch events for category:', response.data);
            }
        } catch (error) {
            console.error('Error fetching events for category:', error);
        }
    };


    useEffect(() => {
        if (search) {
            fetchEventsBySearch(search);
        }
    }, [search]);

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Box sx={{ mb: 5 }}>
                        <Typography variant="h4" gutterBottom>Search Results for "{search}"</Typography>
                        <Grid container spacing={2}>
                            {searchResults.length === 0 ? (
                                <Typography variant="h4" sx={{ mt: 2, ml: 2 }}>No results found</Typography>
                            ) : (
                                searchResults.map((event) => (
                                    <Grid item xs={12} key={event.name}>
                                        <Card sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                                            <CardMedia
                                                sx={{ flex: 1 }}
                                                component="img"
                                                height="140"
                                                width="140"
                                                image={`data:image/jpeg;base64,${event.photo}`}
                                                alt={event.name}
                                            />
                                            <CardContent sx={{ flex: 2 }}>
                                                <Typography variant="h6">{event.name}</Typography>
                                                <Typography>{event.location}</Typography>
                                                <Typography>{event.date.split("T")[0]}</Typography>
                                                <Button
                                                    type="submit"
                                                    width='100%'
                                                    variant="contained"
                                                    sx={{
                                                        mt: 3,
                                                        mb: 2,
                                                        backgroundColor: '#7F1425', // Maroon color
                                                        '&:hover': {
                                                            backgroundColor: '#63101C' // Darker maroon on hover
                                                        },
                                                        ml: 45
                                                    }}
                                                >
                                                    Book now
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
};
