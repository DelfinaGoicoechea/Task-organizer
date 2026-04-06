import "./TaskItem.css";
import type { Task } from "../../types/Task";
import { useState } from "react";

type TaskItemProps = {
  task: Task;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, title: string) => void;
  onToggleTask: (id: number) => void;
};

export default function TaskItem({ task, onDeleteTask, onEditTask, onToggleTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleDeleteTask() {
    onDeleteTask(task.id);
  };

  function handleEditTask() {
    setIsEditing(true);
  };
  
  function handleSave(newTitle: string) {
    onEditTask(task.id, newTitle);
    setIsEditing(false);
  };
  
  function handleCancel() {
    setIsEditing(false);
  };
  
  function handleToggleTask() {
    onToggleTask(task.id);
  }
  
  if(isEditing) {
    return (
      <TaskItemEdit 
        task={task}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  };

  return (
    <TaskItemView 
      task={task}
      onDelete={handleDeleteTask}
      onEdit={handleEditTask}
      onToggle={handleToggleTask}
    />
  );
}

type TaskItemViewProps = {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
  onToggle: () => void;
}

function TaskItemView({ task, onDelete, onEdit, onToggle }: TaskItemViewProps) {
  return (
    <li className='task-item'>
      <input 
        type="checkbox" 
        checked={task.completed}
        onChange={onToggle} 
      />

      <span className={task.completed ? "completed" : ""}>
        {task.title}
      </span>

      <button className="edit-button" onClick={onEdit} title="Edit">
        ✏️️
      </button>
      
      <button className="delete-button" onClick={onDelete} title="Delete"> 
        🗑️
      </button>
    </li>
  );
}

type TaskItemEditProps = {
  task: Task;
  onSave: (title: string) => void;
  onCancel: () => void;
}

function TaskItemEdit({ task, onSave, onCancel }: TaskItemEditProps) {
  const [editValue, setEditValue] = useState<string>(task.title);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false);

  const trimmed = editValue.trim();
  const showError = hasAttemptedSubmit && trimmed === "";

  function handleSave() {
    setHasAttemptedSubmit(true);
    if(!trimmed) return;
    onSave(trimmed);
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEditValue(value);

    if(value.trim() !== ""){
      setHasAttemptedSubmit(false);
    }
  }

  return (
    <li className="task-item">
      <div className="edit-group">
        <div className="input-row">
          <input
            autoFocus
            className={showError ? "input-error" : ""}
            value={editValue}
            onChange={handleChange}
            onKeyDown={(e) => {
              if(e.key === "Enter") handleSave();
              if(e.key === "Escape") onCancel();
            }}
          />

          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
        
        {showError && (
          <p className="error-text">Title cannot be empty</p>
        )}
      </div>   
    </li>
  );
}