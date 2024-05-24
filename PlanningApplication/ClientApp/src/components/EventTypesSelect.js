// EventTypeSelect.js
import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const EventTypeSelect = React.memo(({ eventType, setEventType }) => {
    const [eventTypes, setEventTypes] = useState([]);

    useEffect(() => {
        axios.get('EventType/getEventTypes')
            .then(response => {
                setEventTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching event types:', error);
            });
    }, []);

    return (
        <FormControl fullWidth margin="normal" required>
            <InputLabel id="eventType-label" style={{ color: 'white' }}>Event Type</InputLabel>
            <Select
                labelId="eventType-label"
                id="eventType"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                style={{ color: 'white', borderRadius: '4px' }}
                sx={{ '& fieldset': { borderColor: 'white' } }}
                label="Event Type"
            >
                {eventTypes.map((type) => (
                    <MenuItem key={type.id} value={type.name}>
                        {type.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
});

export default EventTypeSelect;
