// Import necessary hooks from React
import { useEffect, useState } from "react";

// This component renders the UI for filtering tasks (e.g., number of data points)
// It receives two props:
// - filters: an object holding current filter values
// - setFilters: a function to update the filters state
export default function TaskFilter({ filters, setFilters }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label>
        {/* Label and number input for selecting how many data points to use */}
        Number of Data Points:{" "}
        <input
          type="number"                         // Input type is numeric
          value={filters.numPoints}             // Binds the input value to the current state
          onChange={(e) =>                      // Updates the state on user input
            setFilters({
              ...filters,                       // Preserve other filter values
              numPoints: parseInt(e.target.value, 10) // Parse input as integer
            })
          }
          min={1}                               // Minimum allowed value is 1
        />
      </label>
    </div>
  );
}
