import React from 'react';
import { useTasks } from './hooks/useTasks';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';

/**
 * Main App Component
 * 
 * Retro-themed todo application with centered single-column layout.
 * Features task creation, edit-in-place, and toggle completion.
 * 
 * PUBLIC_INTERFACE
 */
function App() {
  const { tasks, loading, error, addTask, editTask, toggleTask, reload } = useTasks();

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">✨ Retro Todo ✨</h1>
          <p className="app-subtitle">Keep track of your tasks in style</p>
        </header>

        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            <span className="error-message">{error}</span>
            <button className="retry-button" onClick={reload} aria-label="Retry">
              ↻ Retry
            </button>
          </div>
        )}

        <main className="main-content">
          <TaskInput onAdd={addTask} />
          <TaskList
            tasks={tasks}
            loading={loading}
            onToggle={toggleTask}
            onEdit={editTask}
          />
        </main>

        <footer className="app-footer">
          <p>
            {tasks.length > 0 && (
              <>
                {tasks.filter(t => t.completed).length} / {tasks.length} completed
              </>
            )}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
