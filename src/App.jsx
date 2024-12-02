import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <TaskProvider>
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
              <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route
                  path="*"
                  element={
                    <ProtectedRoute>
                      <Navbar />
                      <Sidebar />
                      <main className="flex-1 overflow-x-hidden overflow-y-auto">
                        <Routes>
                          <Route exact path="/" element={<Dashboard />} />
                          <Route exact path="/create-task" element={<CreateTask />} />
                          <Route exact path="/edit-task/:id" element={<EditTask />} />
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
      </AuthProvider>
    </Router>
  );
}

export default App;
