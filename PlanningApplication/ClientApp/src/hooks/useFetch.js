
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (initialUrl, options = {
        headers: {
            'Content-Type': 'text/plain',
        },
    }) => {
    const [url, setUrl] = useState(initialUrl);
    const [data, setData] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(url, options);
            if (response.status === 200) {
                setData(response.data);
            }
        }catch (error) {
                console.error('Failed to fetch data', error); 
        }
            
    }, [url, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, refetch: fetchData, setUrl };
};
