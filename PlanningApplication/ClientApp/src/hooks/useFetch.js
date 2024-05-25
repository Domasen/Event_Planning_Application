import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useFetch = (initialUrl) => {
    const [url, setUrl] = useState(initialUrl);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        if (!url) return; // Avoid fetching if the URL is not set
        setLoading(true);
        try {
            const response = await axios.get(url);
            setData(response.data);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData, setUrl };
};