import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTaskContext } from "../contexts/TaskContext";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusToggle = () => {
    updateTask(task.id, { ...task, completed: !task.completed });
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteTask(task.id);
    }, 300);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
        isDeleting ? "scale-95 opacity-50" : ""
      }`}
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {task.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {task.description || "No description"}
        </p>
        <div className="flex items-center justify-between">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              task.completed
                ? "bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100"
                : "bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100"
            }`}
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handleStatusToggle}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <FaCheck />
            </button>
            <Link
              to={`/edit-task/${task.id}`}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <FaEdit />
            </Link>
            <button
              onClick={handleDelete}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
