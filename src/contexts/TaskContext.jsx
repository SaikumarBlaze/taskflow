import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// const API_BASE_URL = "https://jsonplaceholder.typicode.com";
const API_BASE_URL = "http://localhost:5000/api";

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
    const token = localStorage.getItem("taskToken");
    if (token) {
      fetchTasks();
    } else {
      setTasks([]); // Clear tasks if no token is found
    }
    // eslint-disable-next-line
  }, [localStorage.getItem("taskToken")]);

  useEffect(() => {
    filterAndSearchTasks();
    // eslint-disable-next-line
  }, [tasks, filter, searchTerm]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/tasks`, {
        headers: {
          "auth-token": localStorage.getItem("taskToken"), // Authorization token for secured access
        },
      });
      setTasks(
        response.data.tasks.map((task) => ({
          ...task,
          completed: task.status === "Pending" ? false : true,
          order: task._id,
        }))
      ); // Add completed for filtering and order property
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
      // Send POST request with Axios
      const response = await axios.post(
        `${API_BASE_URL}/tasks`,
        {
          title: task.title,
          description: task.description,
          due_date: task.dueDate,
          status: task.completed ? "Completed" : "Pending",
        }, // Request body
        {
          headers: {
            "Content-Type": "application/json", // Inform backend of JSON content
            "auth-token": localStorage.getItem("taskToken"), // Authorization token
          },
        }
      );

      const newTask = { ...response.data.task, order: tasks.length + 1 };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      // Handle errors
      console.error("Failed to add task:", error.message);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await axios.put(
        `${API_BASE_URL}/tasks/${id}`,
        {
          title: updatedTask.title,
          description: updatedTask.description,
          due_date: updatedTask.dueDate,
          status: updatedTask.completed ? "Completed" : "Pending",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("taskToken"),
          },
        }
      );

      fetchTasks();

      // Update the tasks state using a functional update
      // setTasks((prevTasks) =>
      //   prevTasks.map((task) =>
      //     task._id === id
      //       ? {
      //           ...task,
      //           title: updatedData.title,
      //           description: updatedData.description,
      //           due_date: updatedData.due_date,
      //           status: updatedData.status,
      //         }
      //       : task
      //   )
      // );
    } catch (err) {
      setError("Failed to update task. Please try again.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
        headers: {
          "Content-Type": "application/json", // Inform backend of JSON content
          "auth-token": localStorage.getItem("taskToken"), // Authorization token
        },
      });
      setTasks(tasks.filter((task) => task._id !== id));
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
        setTasks,
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
