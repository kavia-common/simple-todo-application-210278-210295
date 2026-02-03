/**
 * API Client for Todo Backend
 * 
 * Provides methods to interact with the todo backend API.
 * Base URL defaults to http://localhost:3001
 * 
 * PUBLIC_INTERFACE
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Fetches all tasks from the backend
 * @returns {Promise<Array>} Array of task objects
 * PUBLIC_INTERFACE
 */
export const fetchTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Creates a new task
 * @param {string} title - The title of the task
 * @returns {Promise<Object>} The created task object
 * PUBLIC_INTERFACE
 */
export const createTask = async (title) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create task: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Updates a task's title
 * @param {number} id - The task ID
 * @param {string} title - The new title
 * @returns {Promise<Object>} The updated task object
 * PUBLIC_INTERFACE
 */
export const updateTask = async (id, title) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update task: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Toggles a task's completion status
 * @param {number} id - The task ID
 * @returns {Promise<Object>} The updated task object
 * PUBLIC_INTERFACE
 */
export const toggleTaskComplete = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/toggle`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to toggle task: ${response.statusText}`);
  }

  return response.json();
};
