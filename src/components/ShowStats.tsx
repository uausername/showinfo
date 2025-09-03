import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Episode, Character } from "../models";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  episodes: Episode[] | null;
  characters: Character[] | null;
}

const ShowStats: React.FC<Props> = ({ episodes, characters }) => {
  const [dataset, setDataset] = useState<"counts" | "episodesPerSeason">(
    "counts"
  );
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");

  if (!episodes || !characters) {
    return null;
  }

  const buildData = () => {
    if (dataset === "episodesPerSeason") {
      const counts: Record<string, number> = {};
      episodes.forEach((ep) => {
        const season = ep.season !== undefined ? String(ep.season) : "Unknown";
        counts[season] = (counts[season] || 0) + 1;
      });
      const labels = Object.keys(counts).sort((a, b) => +a - +b);
      return {
        labels,
        datasets: [
          {
            label: "Episodes",
            data: labels.map((l) => counts[l]),
            backgroundColor: labels.map(() => "rgba(75, 192, 192, 0.6)")
          }
        ]
      };
    }

    return {
      labels: ["Episodes", "Characters"],
      datasets: [
        {
          label: "Count",
          data: [episodes.length, characters.length],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)"
          ]
        }
      ]
    };
  };

  const data = buildData();

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <label>
          Dataset:
          <select
            value={dataset}
            onChange={(e) => setDataset(e.target.value as any)}
          >
            <option value="counts">Counts</option>
            <option value="episodesPerSeason">Episodes per Season</option>
          </select>
        </label>
        <label>
          Chart Type:
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as any)}
          >
            <option value="bar">Bar</option>
            <option value="pie">Pie</option>
          </select>
        </label>
      </div>
      {chartType === "bar" ? <Bar data={data} /> : <Pie data={data} />}
    </div>
  );
};

export default ShowStats;

