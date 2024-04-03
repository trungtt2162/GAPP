import axios from 'axios';
import { useState, useEffect } from 'react';
import { handleError } from '../ultils/helper';

const useFetchData = (apiCall) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall;
        const responseData = response.data

        if (!responseData.Success) {
          setError(responseData.Message || 'Something went wrong');
          return;
        }

        setData(responseData.Data);
        setLoading(false);
      } catch (error) {
        handleError(error)
      }
      
    };

    fetchData();

    return () => {
      // Cleanup function
    };
  }, [apiCall]);

  return { data, loading, error };
};

export default useFetchData;