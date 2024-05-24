// EventContext.js
import React, { useContext, useState, useCallback } from 'react';
import { useFetch } from '../hooks/useFetch.js';
import axios from 'axios';

const EventContext = React.createContext();

const EventProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('a');
    const { data: events, refetch: fetchEvents } = useFetch('Event/getAllEvents');
    const { data: categoryEvents, refetch: fetchEventByCategory, setUrl } = useFetch('Event/getEventsByCategory');

    const fetchEventsByCategory = (id) => {
        setUrl(`Event/getEventsByCategory/${id}`);
        fetchEventByCategory();
    }

    const updateEvent = async (updatedEvent) => {
        try {
            await axios.put(`Event/updateEvent/${updatedEvent.id}`, updatedEvent);
            fetchEvents();
        } catch (error) {
            console.error('Failed to update event', error);
        }
    };

    return (
        <EventContext.Provider value={{ events, categoryEvents, fetchEventsByCategory, setSearchTerm, updateEvent }}>
            {children}
        </EventContext.Provider>
    );
}

export const useEventContext = () => {
    return useContext(EventContext);
}

export { EventContext, EventProvider };
