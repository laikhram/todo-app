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
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const executePost = async (title: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        '/todos',
        { title: title, completed: false }
      );
      setResponse(response.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, executePost };
};

export const useAxiosDelete = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `/todos/${id}`,
      );
      setResponse(response.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, execute };
}

export const useAxiosPut = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = async (id: string, body: { title: string, completed: boolean }) => {
    setLoading(true);

    try {
      const response = await axios.put(
        `/todos/${id}`,
        body
      );
      setResponse(response.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResponse(null);
    setError(null);
    setLoading(false);
  }

  return { response, error, loading, execute, reset };
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
        url: url
      });
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (method === 'GET') {
      fetchData();
    }
  }, [method, url, body, headers]);

  const execute = async (id: any, title?: string) => {
    setLoading(true);

    try {
      const response = await axios({
        method: method,
        url: url,
        data: JSON.parse(body)
      });
      setResponse(response.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, execute };
};