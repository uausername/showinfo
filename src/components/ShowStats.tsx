import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Episode, Character } from "../models";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  episodes: Episode[] | null;
  characters: Character[] | null;
}

const ShowStats: React.FC<Props> = ({ episodes, characters }) => {
  if (!episodes || !characters) {
    return null;
  }

  const data = {
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

  return <Bar data={data} />;
};

export default ShowStats;

