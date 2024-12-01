import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/todos`);
      setTasks(response.data.slice(0, 10)); // Limit to 10 tasks for demo
    } catch (err) {
      setError("Failed to fetch tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, task);
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError("Failed to add task. Please try again.");
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await axios.put(`${API_BASE_URL}/todos/${id}`, updatedTask);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
    } catch (err) {
      setError("Failed to update task. Please try again.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError("Failed to delete task. Please try again.");
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, error, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
