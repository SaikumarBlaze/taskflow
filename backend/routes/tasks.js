import express from "express";
import Task from "../models/Task.js";
import fetchUser from "../middlewares/fetchuser.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

// Route 1: Get all the takss
router.get("/", fetchUser, async (req, res) => {
  try {
    // Fetch all taks of the logged-in user using their ID from the request (set by fetchUser middleware)
    const tasks = await Task.find({ user: req.user.id });
    res.json({ message: "Fetched All Tasks!", tasks });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error!", error });
  }
});

// Route 2: Create a new task
router.post(
  "/",
  fetchUser,
  [
    // Validate task input fields
    body("title")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters long"),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);

      // Check for validation errors and return if any
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      const { title, description, due_date, status } = req.body;

      // Create and save the new task associated with the logged-in user
      const task = await Task.create({
        user: req.user.id, // fetchUser middleware attaches user ID to req object
        title,
        description,
        due_date,
        status: status || "pending",
      });

      // Send a success response with the created task data
      res.status(201).json({ message: "Task created successfully!", task });
    } catch (error) {
      res.status(400).json({ message: "Internal Server Error!", error });
    }
  }
);

// Route 3: Update a task
router.put("/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, due_date, status } = req.body;

    // Create an object to store fields that need to be updated
    const updatedTask = {};
    if (title) updatedTask.title = title;
    if (description) updatedTask.description = description;
    if (due_date) updatedTask.due_date = due_date;
    if (status) updatedTask.status = status;

    // Find the task to be updated by its ID
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task Not Found!");

    // Ensure that only the owner of the task can update it
    if (req.user.id !== task.user.toString())
      return res.status(401).send("Not Allowed!");

    // Update the task with new values
    const newTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: updatedTask }, // Update only the provided fields
      { new: true } // Return the updated task
    );

    // Send a success response with the updated task data
    res.status(201).json({ message: "Task Updated successfully!", newTask });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error!", error });
  }
});

// Route 4: Delete a task
router.delete("/:id", fetchUser, async (req, res) => {
  try {
    // Find the task by its ID to be deleted
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task Not Found!");

    // Ensure that only the owner of the task can delete it
    if (req.user.id !== task.user.toString())
      return res.status(401).send("Not Allowed!");

    // Delete the task from the database
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    // Send a success response with the deleted task data
    res
      .status(201)
      .json({ message: "Task Deleted successfully!", deletedTask });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error!", error });
  }
});

export default router;
