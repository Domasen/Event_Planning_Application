import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { FilterSidebar } from '../components/FilterSidebar';
import { useEventContext } from '../context/EventContext';


export const SearchResults = () => {
    const [searchResults, setSearchResults] = useState([]);
    /*const {searchResults } = useEventContext();*/
    //bus kazkokie search results
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <FilterSidebar />
                </Grid>
                {searchResults === [] ?
                <Grid item xs={9}>
                    <Box sx={{ mb: 5 }}>
                        <Grid container spacing={2}>
                            {searchResults.map((event) => (
                                <Grid item xs={12} key={event.title}>
                                    <Card sx={{
                                        display: 'flex', alignItems: 'center', pl: 2

                                    }}>
                                        <CardMedia
                                            sx={{ flex: 1 }}
                                            component="img"
                                            height="140"
                                            width="140"
                                            image={event.image}
                                            alt={event.title}
                                        />
                                        <CardContent sx={{ flex: 2 }}>
                                            <Typography variant="h6">{event.title}</Typography>
                                            <Typography>{event.location}</Typography>
                                            <Typography>{event.date}</Typography>
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
                            ))}
                        </Grid>
                    </Box>
                    </Grid> : <Typography variant="h4" sx={{mt: 2, ml:2} }>No results found</Typography>}
            </Grid>
        </Container>

    )
}
