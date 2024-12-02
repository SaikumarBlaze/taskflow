import React from "react";
import { useTaskContext } from "../contexts/TaskContext";

const TaskFilters = () => {
  const { setFilter, setSearchTerm } = useTaskContext();

  return (
    <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="mb-2 sm:mb-0">
        <label
          htmlFor="filter"
          className="mr-2 text-gray-700 dark:text-gray-300"
        >
          Filter:
        </label>
        <select
          id="filter"
          onChange={(e) => setFilter(e.target.value)}
          className="px-2 py-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="mt-3 mb-1">
        <label
          htmlFor="search"
          className="mr-2 text-gray-700 dark:text-gray-300"
        >
          Search:
        </label>
        <input
          type="text"
          id="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
          className="px-2 py-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
    </div>
  );
};

export default TaskFilters;
