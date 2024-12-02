import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTaskContext } from "../contexts/TaskContext";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleStatusToggle = () => {
    updateTask(task._id, { ...task, completed: !task.completed });
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteTask(task._id);
    }, 300);
  };

  const openConfirmation = () => {
    setShowConfirm(true);
  };

  const closeConfirmation = () => {
    setShowConfirm(false);
  };

  return (
    <>
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
                to={`/edit-task/${task._id}`}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                <FaEdit />
              </Link>
              <button
                onClick={openConfirmation}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors duration-300"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeConfirmation}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;
