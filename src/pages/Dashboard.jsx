import React from "react";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Task Dashboard
      </h1>
      <TaskList />
    </div>
  );
};

export default Dashboard;
