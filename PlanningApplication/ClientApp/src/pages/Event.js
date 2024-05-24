import React, { useEffect } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

//galima bus dar ideti interactive map

export const Event = () => {
    const { id } = useParams();
  /*  const { data: event, refetch } = useFetch('/Event/getEvent', id);*/
    const event = { title: 'ADVENTUR 2024', location: 'Vilnius', date: '2024-01-24', image: 'https://www.litexpo.lt/wp-content/uploads/2023/05/2023-06-13-ADVENTUR_2146x1240-EN.png' }

 
    return (
        <Container maxWidth="md" style={{ paddingTop: '20px'}}>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <CardMedia
                    component="img"
                    alt="Concert Image"
                    height="350"
                    image={event.image }
                    title="Concert Image"
                />
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {event.title}
                    </Typography>
                </CardContent>

                <Grid container spacing={2} style={{ marginTop: '20px', marginLeft: '0px' }}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" component="h2">
                            <EventIcon /> Date & Time
                        </Typography>
                        <Typography variant="body1">{event.date}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" component="h2">
                            <LocationOnIcon /> Location
                        </Typography>
                        <Typography variant="body1" style={{marginLeft:'5px'} }>
                            {event.location} <br />
                            Kernavės g. 84, Vilnius, 08216
                        </Typography>
                    </Grid>
                </Grid>
                <div style={{ marginLeft: '15px' }}>
                    <Typography variant="h6" component="h2" style={{ marginTop: '20px' }} gutterBottom>
                        About the Event
                    </Typography>
                    <Typography variant="body1">
                        Liepongoiačios vasaros elenga vienas žinomiausių ir talentingiausių Lietuvos atlikėjų Vaidas Baumila savo gerbėjams ruošia
                        tikrą dovaną – grandiozinį koncertą, kuriame netrūks nei jo geriausių hitų, tiek ir kitų pamėgtų dainų.
                    </Typography>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: '30%',
                            mt: 3,
                            mb: 2,
                            backgroundColor: '#7F1425', // Maroon color
                            '&:hover': {
                                backgroundColor: '#63101C' // Darker maroon on hover
                            }
                        }}
                    >
                        Book your ticket now
                    </Button>
                    </div>
            </Paper>
        </Container>
    );

}
