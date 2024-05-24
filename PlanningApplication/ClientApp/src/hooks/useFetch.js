import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url, id = '', options = {
    headers: {
        'Content-Type': 'text/plain',
    }
}) => {
    const [data, setData] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const fullUrl = id ? `${url}/${id}` : url;
            const response = await axios.get(fullUrl, options);
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    }, [url, id, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, refetch: fetchData };
};
