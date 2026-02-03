import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, toggleTaskComplete } from '../api/todoApi';

/**
 * Custom hook for managing tasks
 * 
 * Provides task state management with loading and error states,
 * along with methods to add, update, and toggle tasks.
 * 
 * @returns {Object} Tasks state and operations
 * PUBLIC_INTERFACE
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load tasks on mount
  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  /**
   * Add a new task
   * PUBLIC_INTERFACE
   */
  const addTask = async (title) => {
    if (!title.trim()) return;
    
    setError(null);
    try {
      const newTask = await createTask(title);
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Update an existing task
   * PUBLIC_INTERFACE
   */
  const editTask = async (id, title) => {
    if (!title.trim()) return;
    
    setError(null);
    try {
      const updatedTask = await updateTask(id, title);
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Toggle task completion status
   * PUBLIC_INTERFACE
   */
  const toggleTask = async (id) => {
    setError(null);
    try {
      const updatedTask = await toggleTaskComplete(id);
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    editTask,
    toggleTask,
    reload: loadTasks,
  };
};
