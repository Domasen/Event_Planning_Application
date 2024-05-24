import React from 'react';
import { useContext, useState, useCallback, useEffect } from 'react';
const EventContext = React.createContext();

const EventProvider = ({ children }) => {
    const [categoryEvents, setCategoryEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('a');

    const fetchEventsByCategory = async (id) => {
        //try {
        //        //koks url?
        //        const response = await axios.get('/User/currentUser', {
        //            headers: {
        //                'Content-Type': 'text/plain',
        //            },
        //        });
        //        if (response.status === 200) {
        //            setCategoryEvents(response.data);
        //        }
        //    } catch (error) {
        //        console.error('Failed to fetch user', error);
        //    }
    }

    const fetchEvents = useCallback(async () => {
 
            
    }, [searchTerm])

    useEffect(() => {
        fetchEvents()
    }, [searchTerm, fetchEvents])

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