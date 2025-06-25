import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Helper to bin data into ranges (buckets)
function createHistogramData(data, numBins = 10) {
  if (data.length === 0) return [];

  const values = data.map(d => d.current);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const binSize = (max - min) / numBins;

  const bins = Array.from({ length: numBins }, (_, i) => ({
    range: `${(min + i * binSize).toFixed(2)}–${(min + (i + 1) * binSize).toFixed(2)}`,
    count: 0
  }));

  for (const v of values) {
    let binIndex = Math.floor((v - min) / binSize);
    if (binIndex === numBins) binIndex--; // include max value in last bin
    bins[binIndex].count++;
  }

  return bins;
}

export default function HistogramPlot({ taskId }) {
  const [data, setData] = useState([]);
  const [histogramData, setHistogramData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/task/${taskId}/data`)
      .then((res) => res.json())
      .then((rawData) => {
        setData(rawData);
        setHistogramData(createHistogramData(rawData, 10)); // 10 bins
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [taskId]);

  return (
    <BarChart width={700} height={500} data={histogramData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="range" angle={-30} textAnchor="end" height={80} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}
