# TaskFlow

TaskFlow is an advanced task management application designed to help users efficiently create, edit, and organize their daily tasks. Built with React for the frontend and Node.js with MongoDB for the backend, TaskFlow ensures a seamless and user-friendly experience. With features like due date tracking, task status updates, and responsive design, TaskFlow helps users stay productive and on top of their responsibilities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- Create, edit, and delete tasks effortlessly.
- Track tasks with due dates and status (Pending/Completed).
- Secure user authentication to protect your data.
- Responsive design optimized for both mobile and desktop.

## Technologies Used

- **Frontend**: React, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS

## Installation

To get a local copy up and running, follow these steps:

1. Clone the repo

- git clone https://github.com/yourusername/taskflow.git
- cd taskflow

2. Install the required packages in the same root directory:

- npm install

3. Set up Tailwind CSS in the same root directory:

- npx tailwindcss init -p

4. Create a .env file in the same root directory and add your backend api url

- REACT_APP_API_URL = http://localhost:5000

5. Navigate to the backend directory

- cd ../backend
- Install the required packages - npm install

5. Create a .env file in the backend directory and add your MongoDB connection string and jwt secret:

- MONGODB_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret

5. Start the backend server

- node ./index.js

6. Navigate to root directory and Start the development server:

- cd ..
- npm start

## Usage

- Visit http://localhost:3000 in your web browser.
- Create an account or log in to access your tasks.
- Use the dashboard to create, edit, and delete your tasks.

## API Endpoints

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/api/tasks`     | Retrieve all tasks           |
| POST   | `/api/tasks`     | Create a task                |
| PUT    | `/api/tasks/:id` | Update a specific task by ID |
| DELETE | `/api/tasks/:id` | Delete a specific task by ID |
