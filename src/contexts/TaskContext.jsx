import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterAndSearchTasks();
  }, [tasks, filter, searchTerm]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/todos`);
      setTasks(
        response.data.slice(0, 10).map((task) => ({ ...task, order: task.id }))
      ); // Add order property
    } catch (err) {
      setError("Failed to fetch tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSearchTasks = () => {
    let result = tasks;

    if (filter !== "all") {
      result = result.filter((task) =>
        filter === "completed" ? task.completed : !task.completed
      );
    }

    if (searchTerm) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(result);
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, task);
      const newTask = { ...response.data, order: tasks.length + 1 };
      setTasks([...tasks, newTask]);
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

  const reorderTasks = (startIndex, endIndex) => {
    const result = Array.from(tasks);
    const [reorderedItem] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, reorderedItem);

    const updatedTasks = result.map((task, index) => ({
      ...task,
      order: index + 1,
    }));

    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        loading,
        error,
        addTask,
        updateTask,
        deleteTask,
        setFilter,
        setSearchTerm,
        reorderTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
