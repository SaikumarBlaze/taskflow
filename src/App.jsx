import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <TaskProvider>
          <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create-task" element={<CreateTask />} />
                <Route path="/edit-task/:id" element={<EditTask />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </TaskProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
