import React, { useState } from "react";
import "./TaskInput.css";

type TaskInputProps = {
	onAddTask: (title: string) => void;
};

export default function TaskInput({ onAddTask }: TaskInputProps) {
	const [inputValue, setInputValue] = useState<string>("");
	const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false);

	const trimmedValue = inputValue.trim();
	const showError = hasAttemptedSubmit && trimmedValue === "";

	function handleSubmit() {
		setHasAttemptedSubmit(true);
		if(!trimmedValue) return;
		
		onAddTask(trimmedValue);
		setInputValue("");
		setHasAttemptedSubmit(false);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if(e.key === "Enter") {
			handleSubmit();
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);

    if(value.trim() !== ""){
      setHasAttemptedSubmit(false);
    }
  }

	return (
		<>
			<div className="task-input">
				<div className="input-group">
					<input 
						className={showError ? "input-error" : ""} 
						placeholder="New task" 
						value={inputValue} 
						onKeyDown={handleKeyDown}
						onChange={handleChange}
					/>
					{showError && (
						<p className="error-text">Title cannot be empty</p>
					)}
				</div>
				<button onClick={handleSubmit}>Add Task</button>
			</div>
		</>
	);
}
