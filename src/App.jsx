import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { TaskProvider } from "./contexts/TaskContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import VerifyEmail from "./components/VerifyEmail";
import ResetPassword from "./components/ResetPassword";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(false);

  return (
    <Router>
      <ThemeProvider>
        <TaskProvider>
          <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Routes>
              <Route
                exact
                path="/signup"
                element={<Signup token={token} setToken={setToken} />}
              />
              <Route
                exact
                path="/login"
                element={<Login token={token} setToken={setToken} />}
              />
              <Route
                exact
                path="/account/verify-email"
                element={<VerifyEmail />}
              />
              <Route
                exact
                path="/account/reset-password"
                element={<ResetPassword token={token} setToken={setToken} />}
              />
              <Route
                path="*"
                element={
                  <ProtectedRoute>
                    <Navbar token={token} setToken={setToken} />
                    <Sidebar token={token} setToken={setToken} />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto">
                      <Routes>
                        <Route exact path="/" element={<Dashboard />} />
                        <Route
                          exact
                          path="/create-task"
                          element={<CreateTask />}
                        />
                        <Route
                          exact
                          path="/edit-task/:id"
                          element={<EditTask />}
                        />
                        <Route exact path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </TaskProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
