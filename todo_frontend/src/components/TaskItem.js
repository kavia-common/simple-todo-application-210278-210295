import React, { useState } from 'react';
import './TaskItem.css';

/**
 * TaskItem Component
 * 
 * Displays a single task with edit-in-place and toggle completion functionality.
 * 
 * @param {Object} task - The task object
 * @param {Function} onToggle - Callback to toggle task completion
 * @param {Function} onEdit - Callback to edit task title
 * PUBLIC_INTERFACE
 */
const TaskItem = ({ task, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(task.title);
  };

  const handleSave = () => {
    if (editValue.trim() && editValue !== task.title) {
      onEdit(task.id, editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <button
        className="toggle-button"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed ? '✓' : '○'}
      </button>

      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            className="edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            autoFocus
            aria-label="Edit task"
          />
        </div>
      ) : (
        <div className="task-content" onClick={handleEdit}>
          <span className="task-title">{task.title}</span>
        </div>
      )}

      {!isEditing && (
        <button
          className="edit-button"
          onClick={handleEdit}
          aria-label="Edit task"
        >
          ✎
        </button>
      )}
    </div>
  );
};

export default TaskItem;
