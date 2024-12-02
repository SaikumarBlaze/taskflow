import React from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useTaskContext } from "../contexts/TaskContext";

const EditTask = () => {
  const { id } = useParams();
  const { tasks } = useTaskContext();
  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return <div className="text-center py-4">Task not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Edit Task
      </h1>
      <TaskForm task={task} isEditing={true} />
    </div>
  );
};

export default EditTask;
