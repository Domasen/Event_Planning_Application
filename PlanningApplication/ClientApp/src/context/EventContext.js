import React from 'react';
import { useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import {useFetch } from '../hooks/useFetch.js';

const EventContext = React.createContext();

const EventProvider = ({ children }) => {
 /*   const [categoryEvents, setCategoryEvents] = useState([]);*/
    /*const [events, setEvents] = useState([]);*/
    const [searchTerm, setSearchTerm] = useState('a');

    const { data: events, refetch: fetchEvents } = useFetch('Event/getAllEvents');

   /* const { data: categoryEvents, refetch: fetchEventsByCategory, setCategoryUrl } = useFetch('Event/getEventsByCategory');*/


    return (
        <EventContext.Provider value={{setSearchTerm }}>
            {children}
        </EventContext.Provider>
    )
}

export const useEventContext = () => {
    return useContext(EventContext);
}

export { EventContext, EventProvider };