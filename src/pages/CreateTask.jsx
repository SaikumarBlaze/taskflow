import React from "react";
import TaskForm from "../components/TaskForm";

const CreateTask = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Create New Task
      </h1>
      <TaskForm />
    </div>
  );
};

export default CreateTask;
