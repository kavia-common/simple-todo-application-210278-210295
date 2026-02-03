import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

/**
 * TaskList Component
 * 
 * Displays a list of tasks with loading and empty states.
 * 
 * @param {Array} tasks - Array of task objects
 * @param {Function} onToggle - Callback to toggle task completion
 * @param {Function} onEdit - Callback to edit task
 * @param {boolean} loading - Loading state
 * PUBLIC_INTERFACE
 */
const TaskList = ({ tasks, onToggle, onEdit, loading }) => {
  if (loading) {
    return (
      <div className="task-list-message">
        <div className="spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-message">
        <p className="empty-message">No tasks yet. Add one to get started! 🚀</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
