import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const remaining = tasks.filter(t => !t.done).length;

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <h1>Today's List</h1>
          <span className="count">{remaining} left</span>
        </div>

        <form onSubmit={addTask} className="add-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task..."
          />
          <button type="submit">Add</button>
        </form>

        {tasks.length === 0 ? (
          <p className="empty">Add your first task.</p>
        ) : (
          <ul className="list">
            {tasks.map((task) => (
              <li key={task.id} className={task.done ? 'done' : ''}>
                <button
                  className="check"
                  onClick={() => toggleTask(task.id)}
                  aria-label="toggle task"
                >
                  {task.done && '✓'}
                </button>
                <span className="text">{task.text}</span>
                <button className="delete" onClick={() => deleteTask(task.id)}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
