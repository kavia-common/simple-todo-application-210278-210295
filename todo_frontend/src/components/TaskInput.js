import React, { useState } from 'react';
import './TaskInput.css';

/**
 * TaskInput Component
 * 
 * Provides an input field for adding new tasks.
 * 
 * @param {Function} onAdd - Callback function to add a task
 * PUBLIC_INTERFACE
 */
const TaskInput = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value);
      setValue('');
    }
  };

  return (
    <form className="task-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="What needs to be done?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="New task input"
      />
      <button type="submit" className="add-button" aria-label="Add task">
        + Add
      </button>
    </form>
  );
};

export default TaskInput;
