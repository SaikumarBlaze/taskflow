import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../contexts/TaskContext";

const TaskForm = ({ task, isEditing }) => {
  const navigate = useNavigate();
  const { addTask, updateTask } = useTaskContext();
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [status, setStatus] = useState(task?.completed || false);
  const [errors, setErrors] = useState({});

  // Set default due date to today if it's not already provided
  useEffect(() => {
    if (!task?.dueDate) {
      setDueDate(new Date().toISOString().split("T")[0]);
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (dueDate && new Date(dueDate) < new Date())
      newErrors.dueDate = "Due date cannot be in the past";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const taskData = { title, description, dueDate, completed: status };

    if (isEditing) {
      await updateTask(task.id, taskData);
    } else {
      await addTask(taskData);
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-2 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="mt-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="mt-2 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          ></textarea>
        </div>

        {/* Due Date Field */}
        <div>
          <label
            htmlFor="dueDate"
            className="mt-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`mt-2 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.dueDate ? "border-red-500" : ""
            }`}
          />
          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>
          )}
        </div>

        {/* Status Field */}
        <div>
          <label
            htmlFor="status"
            className="mt-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value === "true")}
            className="mt-2 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value={false}>Pending</option>
            <option value={true}>Completed</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full mt-8 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isEditing ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
