import { useParams, Link } from "react-router-dom";
import ScatterPlot from "./ScatterPlot";

export default function ScatterPage() {
  const { taskId } = useParams(); // // Get the value of taskId from the URL using React Router

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Scatter Plot for Task #{taskId}</h2>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/"><button>Back to Task List</button></Link>
      </div>
      <ScatterPlot taskId={parseInt(taskId)} />
    </div>
  );
}
