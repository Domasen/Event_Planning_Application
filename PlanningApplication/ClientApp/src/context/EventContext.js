import React, { useContext, useState, useCallback, useMemo } from 'react';
import { useFetch } from '../hooks/useFetch.js';
import axios from 'axios';

const EventContext = React.createContext();

const EventProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('a');
    const { data: events, refetch: fetchEvents } = useFetch('Event/getAllEvents');
    const { data: categoryEvents, refetch: fetchEventByCategory, setUrl } = useFetch('Event/getEventsByCategory');

    const fetchEventsByCategory = useCallback((id) => {
        setUrl(`Event/getEventsByCategory/${id}`);
        fetchEventByCategory();
    }, [setUrl, fetchEventByCategory]);

    const updateEvent = useCallback(async (updatedEvent) => {
        try {
            await axios.put(`Event/updateEvent/${updatedEvent.id}`, updatedEvent);
            fetchEvents();
        } catch (error) {
            console.error('Failed to update event', error);
        }
    }, [fetchEvents]);

    const value = useMemo(() => ({
        events, categoryEvents, fetchEventsByCategory, setSearchTerm, updateEvent
    }), [events, categoryEvents, fetchEventsByCategory, setSearchTerm, updateEvent]);

    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    );
}

export const useEventContext = () => {
    return useContext(EventContext);
}

export { EventContext, EventProvider };
