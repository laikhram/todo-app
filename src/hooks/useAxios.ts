import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

// GET    /todos
// GET    /todos/1
// POST   /todos
// PUT    /todos/1
// PATCH  /todos/1
// DELETE /todos/1

export const useAxiosGet = (id?: string) => {
  return useAxios({
    url: id ? `/todos/${id}` : '/todos',
    method: 'GET'
  });
}

export const useAxiosPost = () => {
  return useAxios({
    url: '/todos',
    method: 'POST',
  });
}

export const useAxiosDelete = (id: string) => {
  return useAxios({
    url: `/todos/${id}`,
    method: 'DELETE'
  });
}

const useAxios = (
  { url, method, body = null, headers = null }: { url: string, method: string, body?: any | null, headers?: string | null }
) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await axios({
        method: method,
        url: url,
        data: JSON.parse(body)
      });
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const operation = async (params: any) => {
    setLoading(true)

    try {
      const res = await axios({
        method: method,
        url: url,
        data: body
      });
      setResponse(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers]);

  return { response, error, loading, operation };
};