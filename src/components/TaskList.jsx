import React from "react";
import { useTaskContext } from "../contexts/TaskContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks, loading, error } = useTaskContext();

  if (loading) return <div className="text-center py-4">Loading tasks...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {tasks.length === 0 && (
        <span className="text-white">
          Notes you add appear here
        </span>
      )}
      {tasks.length !== 0 &&
        tasks.map((task) => <TaskItem key={task._id} task={task} />)}
    </div>
  );
};

export default TaskList;
