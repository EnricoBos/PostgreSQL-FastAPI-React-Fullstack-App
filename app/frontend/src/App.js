// Importing React hooks and routing tools
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing components for different parts of the UI
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import FilterBar from "./FilterBar";
import ScatterPage from "./ScatterPage";       // scatter plot component
import HistogramPage from "./HistogramPage";   // histogram plot component

// Main App component
export default function App() {
  const [filters, setFilters] = useState({ numPoints: 10 });

  return (
    // Router enables navigation based on URL paths
    <Router>
       {/* Main container for consistent layout and styling */}
      <div style={{
        width: "95%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
        fontFamily: "'Poppins', sans-serif"
      }}>
        <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
          FastAPI Task Manager
        </h1>
        {/* Defines which component to render for each URL */}
        <Routes>
          {/* Main page with filters, form, and task list */}
          <Route path="/" element={
            <>
              {/* FilterBar lets users configure task parameters */}
              <div style={{ marginBottom: "30px" }}>
                <h2>1. Filters</h2>
                <FilterBar filters={filters} setFilters={setFilters} />
              </div>
              {/* TaskList shows current tasks and links to visualizations */}
              <div style={{ marginBottom: "30px" }}>
                <h2>2. Task Info</h2>
                <TaskForm filters={filters} />
              </div>
              <div>
                <h2>3. Task List</h2>
                 {/* TaskList.js is called and runs !! */}
                <TaskList />  
              </div>
            </>
          } />

          {/* Route for scatter plot visualization page */}
          <Route path="/plot/scatter/:taskId" element={<ScatterPage />} />

          {/* Route for histogram visualization page */}
          <Route path="/plot/histogram/:taskId" element={<HistogramPage />} />
        </Routes>
      </div>
    </Router>
  );
}





