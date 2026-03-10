import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
);

export default function SpendChart({ data }) {
    const labels = data.map(d => d.x);
    const values = data.map(d => d.y);

    return (
        <div className="bg-white rounded shadow-sm p-3">
            <Line
                data={{
                    labels,
                    datasets: [
                        {
                            label: "Spend Amount",
                            data: values,
                            fill: true,
                            borderColor: "#6f42c1",
                            backgroundColor: "rgba(111,66,193,0.2)",
                            tension: 0.4,
                            pointRadius: 4,
                            pointBackgroundColor: "#6f42c1"
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        tooltip: { mode: "index", intersect: false }
                    },
                    scales: {
                        x: { display: true },
                        y: { display: true, beginAtZero: true }
                    }
                }}
            />
        </div>
    );
}