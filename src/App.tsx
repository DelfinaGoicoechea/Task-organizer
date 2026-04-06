import { useState } from 'react';
import './App.css';
import type { Task } from './types/Task';
import TaskInput from './components/TaskInput/TaskInput';
import TaskList from './components/TaskList/TaskList';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      completed: false
    };

    setTasks([newTask, ...tasks]);
  };

  function handleDeleteTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  function handleEditTask(id: number, newTitle: string) {
    setTasks((prevTasks) => 
      prevTasks.map((task) => {
        if (task.id === id) {
          return {...task, title: newTitle};
        };
        return task;
      })
    );
  }

  function handleToggleTask(id: number) {
    setTasks((prevTasks) => 
      prevTasks.map((task) => {
        if (task.id === id) {
          return {...task, completed: !task.completed}
        };
        return task;
      })
    );
  }

  return (
    <>
      <main className="task-organizer"> 
        <h1 className="task-organizer-title">My Task Organizer</h1>
        <div className="card">
          <TaskInput onAddTask={handleAddTask} />
        </div>
        <div className="card">
          <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} onToggleTask={handleToggleTask} />
        </div>
      </main>
    </>
  );
}

export default App
