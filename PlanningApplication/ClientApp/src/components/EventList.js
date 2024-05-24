// components/EventList.js
import React from 'react';
import { Grid } from '@mui/material';
import EventCard from '../pages/EventCard';
import { useEventContext } from '../context/EventContext';

const EventList = () => {
    const { events } = useEventContext();

    return (
        <Grid container spacing={2}>
            {events.map(event => (
                <Grid item key={event.id} xs={12}>
                    <EventCard event={event} />
                </Grid>
            ))}
        </Grid>
    );
};

export default EventList;
