import { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "./api";
import { Link } from "react-router-dom";

//import TaskPlot from "./TaskPlot";

export default function TaskList() {
  // Local state to hold the list of tasks
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Load tasks from the backend on mount, and refresh every 2 seconds
  useEffect(() => {
    const loadTasks = () => fetchTasks().then(setTasks);
    loadTasks();
    const interval = setInterval(loadTasks, 2000);
    return () => clearInterval(interval);
  }, []);

  // Delete a task and update the UI
  const handleDelete = async (id) => {
    await deleteTask(id); // call backend: This is asynchronous, the function waits until the backend confirms the deletion.
    setTasks(tasks.filter((t) => t.id !== id)); // update UI  keeping only tasks where t.id !== id
    if (selectedTaskId === id) setSelectedTaskId(null); // reset selection if needed
  };
    // Find the currently selected task (not used in UI but here for potential expansion)
  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  const cellStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  };

  return (
    <div>
       {/* Render task table */}
      <div style={{ marginBottom: "40px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            border: "1px solid #ccc",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f9f9f9" }}>
              <th style={cellStyle}>ID</th>
              <th style={cellStyle}>Username</th>
              <th style={cellStyle}>Description</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td style={cellStyle}>{task.id}</td>
                <td style={cellStyle}>{task.username}</td>
                <td style={cellStyle}>{task.description}</td>
                <td style={cellStyle}>{task.status}</td>
                <td style={cellStyle}>
                   {/* Delete button */}
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                  {/* Show plot buttons if task is completed */}
                 {task.status === "completed" && (
                    <>
                      <Link to={`/plot/scatter/${task.id}`}> 
                        <button style={{ marginLeft: "10px" }}>Show Scatter</button> 
                      </Link>
                      <Link to={`/plot/histogram/${task.id}`}>
                        <button style={{ marginLeft: "10px" }}>Show Histogram</button> 
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}


