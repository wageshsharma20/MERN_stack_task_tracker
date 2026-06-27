import { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAuthConfig = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
  };

  const fetchTasks = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.priority) queryParams.append('priority', filters.priority);
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
      
      const response = await axios.get(`/api/tasks?${queryParams.toString()}`, getAuthConfig());
      setTasks(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData) => {
    try {
      const response = await axios.post('/api/tasks', taskData, getAuthConfig());
      setTasks((prev) => [response.data, ...prev]);
      toast.success('Task created successfully');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      return false;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, taskData, getAuthConfig());
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.data : task))
      );
      toast.success('Task updated successfully');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      return false;
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`, getAuthConfig());
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success('Task deleted successfully');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
      return false;
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, fetchTasks, createTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
