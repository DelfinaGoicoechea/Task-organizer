import "./TaskList.css";
import type { Task } from '../../types/Task';
import TaskItem from "../TaskItem/TaskItem";

type TaskListProps = {
	tasks: Task[];
	onDeleteTask: (id: number) => void;
	onEditTask: (id: number, title: string) => void;
	onToggleTask: (id: number) => void;
}

export default function TaskList({ tasks, onDeleteTask, onEditTask, onToggleTask }: TaskListProps) {
	if(tasks.length === 0) {
		return <p>You're all caught up 🎉</p>;
	}

	return (
		<ul className="task-list">
			{tasks.map((task) => (
				<TaskItem key={task.id} task={task} onDeleteTask={onDeleteTask} onEditTask={onEditTask} onToggleTask={onToggleTask} />
			))}
		</ul>
	);
}