﻿import React from 'react';
import { useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import {useFetch } from '../hooks/useFetch.js';

const EventContext = React.createContext();

const EventProvider = ({ children }) => {
 /*   const [categoryEvents, setCategoryEvents] = useState([]);*/
    /*const [events, setEvents] = useState([]);*/
    const [searchTerm, setSearchTerm] = useState('a');

    const { data: events, refetch: fetchEvents } = useFetch('Event/getAllEvents');

    const { data: categoryEvents, refetch: fetchEventByCategory, setUrl } = useFetch('Event/getEventsByCategory');

    const fetchEventsByCategory = (id) => {
        setUrl(`Event/getEventsByCategory/${id}`);
        fetchEventByCategory();
    }


    return (
        <EventContext.Provider value={{ categoryEvents, fetchEventsByCategory, setSearchTerm }}>
            {children}
        </EventContext.Provider>
    )
}

export const useEventContext = () => {
    return useContext(EventContext);
}

export { EventContext, EventProvider };