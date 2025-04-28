import axios from 'axios';
import { useState, useEffect } from 'react';
const URL = "http://localhost:3000/";
const useApiRequest = ({url, method = 'get', initialData = null , body= {}}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios({
        baseURL: URL,
        url,
        method,
        body,

      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
      fetchData();
  }, [url, method]);

  return { data, loading, error, fetchData };
};
const  apiRequest = async ({url, method, body }) => {
        try {
        const response = await axios({
            baseURL: URL,
            url,
            headers: {
                'Content-Type': 'application/json',
            },
            method,
            data: JSON.stringify(body),
    
        });
        return response.data;
        } catch (err) {
            console.error('API request error:', err);
        } 
    }
export  {useApiRequest, apiRequest};