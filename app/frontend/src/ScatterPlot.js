import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function ScatterPlot({ taskId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    //console.log("Fetching data for taskId:", taskId);  // <- Debug log
    fetch(`http://localhost:8000/task/${taskId}/data`)  // 
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching data:", err));
  }, [taskId]);

  return (
    <LineChart width={700} height={500} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="index" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="current" stroke="#8884d8" />
      <Line type="monotone" dataKey="voltage" stroke="#82ca9d" />
    </LineChart>
  );
}
