// Base URL pointing to your FastAPI backend server.
// If you deploy this in production, change this to your server URL.

const BASE_URL = "http://localhost:8000"; // Your FastAPI backend

// Function to create a new task by sending a POST request to the backend.
export async function createTask(taskPayload) {
  const response = await fetch(`${BASE_URL}/task/create`, {
    method: "POST", // HTTP method for creating resources
    headers: { "Content-Type": "application/json" }, // Sending JSON data
    body: JSON.stringify(taskPayload),  // Convert JS object to JSON string
  });
   // If request fails, throw an error to handle it in the UI
  if (!response.ok) throw new Error("Failed to create task");
  return await response.json();
}

// Function to fetch the list of all tasks from the backend
export async function fetchTasks() {
  const response = await fetch(`${BASE_URL}/task/list`);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  // Return the list of tasks as JSON
  return await response.json();
}

export async function deleteTask(taskId) {
  const response = await fetch(`${BASE_URL}/task/${taskId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete task");
  return await response.json();
}
