import { useParams, Link } from "react-router-dom";
import HistogramPlot from "./HistogramPlot";

export default function HistogramPage() {
  const { taskId } = useParams(); // Gets taskId from the URL

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>
        Histogram for Task #{taskId}{" "}
        <span style={{ position: "relative", cursor: "pointer" }}>
          <span
            style={{
              border: "1px solid #999",
              borderRadius: "50%",
              padding: "0 6px",
              marginLeft: "8px",
              backgroundColor: "#eee",
              fontSize: "14px",
              display: "inline-block"
            }}
            title="This histogram shows how the values from this task are distributed. It helps you understand the frequency of different value ranges (e.g., low, medium, high)."
          >
            ℹ️
          </span>
        </span>
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <Link to="/"><button>Back to Task List</button></Link>
      </div>

      <HistogramPlot taskId={parseInt(taskId)} />
    </div>
  );
}
