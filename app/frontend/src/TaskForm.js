// Import React hook for local component state
import { useState } from "react";
// Import the API function to create a task
import { createTask } from "./api";
// this is to create task and run !

// This component handles the creation of new tasks
export default function TaskForm({ filters }) {
  
  // 1. State variables to store user input
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  
  // 2. Function called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page reload on form submit

    const taskPayload = {
      username,
      description,
      num_points: filters.numPoints ,  // merge filters like num_points into the payload
    };

     // Call the API to create a new task
    await createTask(taskPayload);

    // Reset form fields after successful submission
    setUsername("");
    setDescription("");
  };

  // 3. JSX form layout
  return (
    <form onSubmit={handleSubmit}>
      {/* Input for username */}
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        required
      />

      {/* Input for description */}
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        required
      />

      {/* Submit button */}
      <button type="submit">Create Task</button>
    </form>
  );
}
