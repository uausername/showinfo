import React from "react";
import { useParams } from "react-router-dom";

const ShowPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  return (
    <div>
      <h2>{name}</h2>
      <p>Data and visualizations coming soon.</p>
    </div>
  );
};

export default ShowPage;
