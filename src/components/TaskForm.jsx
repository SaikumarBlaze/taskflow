import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../contexts/TaskContext";
import {
  HiOutlineClipboardList,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
} from "react-icons/hi";

const TaskForm = ({ task, isEditing }) => {
  const navigate = useNavigate();
  const { addTask, updateTask } = useTaskContext();
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(
    task?.due_date ? new Date(task.due_date).toISOString().split("T")[0] : ""
  );
  const [status, setStatus] = useState(task?.completed || false);
  const [errors, setErrors] = useState({});

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
      await updateTask(task._id, taskData);
    } else {
      await addTask(taskData);
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 dark:bg-gray-700">
          <div
            className={`h-2 ${
              title && dueDate ? "bg-blue-600" : "bg-gray-400"
            } transition-all duration-300`}
            style={{ width: `${title && dueDate ? 100 : 50}%` }}
          ></div>
        </div>

        <div>
          <label
            htmlFor="title"
            className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200"
          >
            <HiOutlineClipboardList className="inline-block mr-2" />
            <span>Title *</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-1 px-3 py-2 block w-full rounded-md border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div className="mt-2">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter a brief description (optional)"
          />
        </div>

        <div className="mt-2">
          <label
            htmlFor="dueDate"
            className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200"
          >
            <HiOutlineCalendar className="inline-block mr-2" />
            <span>Due Date *</span>
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`mt-1 px-3 py-2 block w-full rounded-md border ${
              errors.dueDate ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
          />
          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>
          )}
        </div>

        <div className="mt-2">
          <label
            htmlFor="status"
            className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200"
          >
            <HiOutlineCheckCircle className="inline-block mr-2" />
            <span>Status</span>
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value === "true")}
            className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value={false}>Pending</option>
            <option value={true}>Completed</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isEditing ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
