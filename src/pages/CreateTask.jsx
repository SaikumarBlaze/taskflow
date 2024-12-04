import React from "react";
import TaskForm from "../components/TaskForm";
import taskIllustration from "../assets/images/task-illustration.webp";

const CreateTask = () => {
  return (
    <div className="container min-h-screen mx-auto px-4 flex items-center mt-24 md:mt-5 mb-5 lg:my-0">
      <div
        className="flex flex-col lg:flex-row items-center bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden w-full lg:w-3/4 mx-auto"
        style={{ width: "75%" }}
      >
        <div className="hidden lg:flex items-center justify-center w-full lg:w-1/3 bg-blue-100 dark:bg-blue-900 p-6 ml-8">
          <img
            src={taskIllustration}
            alt="Task Illustration"
            className="w-full h-auto"
          />
        </div>

        <div className="w-full lg:w-2/3 p-6 lg:p-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white text-center mb-6">
            Create New Task
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            Organize your work effectively. Fill in the details below to add
            your task.
          </p>
          <TaskForm />
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
