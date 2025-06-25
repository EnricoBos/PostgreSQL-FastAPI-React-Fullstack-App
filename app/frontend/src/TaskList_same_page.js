import { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "./api";
import TaskPlot from "./TaskPlot";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    const loadTasks = () => fetchTasks().then(setTasks);
    loadTasks();
    const interval = setInterval(loadTasks, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
    if (selectedTaskId === id) setSelectedTaskId(null);
  };

  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  const cellStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  };

  return (
    <div>
      {/* Table Section */}
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
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                  {task.status === "completed" && (
                    <button
                      onClick={() => setSelectedTaskId(task.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Show Plot
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Plot Section */}
      {selectedTask && (
        <div style={{ 
                  display: "flex",
                  justifyContent: "center",      // center horizontally
                  alignItems: "center",          // center vertically
                  minHeight: "70vh",             // set vertical space (or use 100vh)
                  flexDirection: "column",}}>
          <h3>
            Plot for Task #{selectedTask.id} ({selectedTask.username})
          </h3>
          <TaskPlot taskId={selectedTask.id} />
        </div>
      )}
    </div>
  );

}


