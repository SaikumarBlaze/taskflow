import connectToDatabase from "./db.js";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import tasksRouter from "./routes/tasks.js";

// Connects Express server to a database
connectToDatabase();

const app = express(); // Create an instance of express server
const port = process.env.PORT || 10000;

app.use(express.json()); // Parses incoming requests with JSON and makes it available in req.body.
app.use(cors());

// Available Routes
app.use("/api/auth", authRouter);
app.use("/api/tasks", tasksRouter);

// Start the server and listen on port 5000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
