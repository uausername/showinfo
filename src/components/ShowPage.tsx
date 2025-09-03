import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getEpisodes as getSouthParkEpisodes } from "../api/southPark";
import { getEpisodes as getBobsBurgersEpisodes } from "../api/bobsBurgers";
import {
  normalizeSouthParkEpisode,
  normalizeBobsBurgersEpisode
} from "../models/normalizers";
import { Episode } from "../models";

const ShowPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEpisodes() {
      if (!name) return;
      try {
        if (name === "south-park") {
          const data = await getSouthParkEpisodes();
          setEpisodes(data.map(normalizeSouthParkEpisode));
        } else if (name === "bobs-burgers") {
          const data = await getBobsBurgersEpisodes();
          setEpisodes(data.map(normalizeBobsBurgersEpisode));
        } else if (name === "family-guy") {
          setError("No public API available for Family Guy.");
        } else {
          setError("Unknown show.");
        }
      } catch (e) {
        setError((e as Error).message);
      }
    }

    fetchEpisodes();
  }, [name]);

  if (error) {
    return (
      <div>
        <h2>{name}</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{name}</h2>
      {episodes ? (
        <ul>
          {episodes.map((ep) => (
            <li key={ep.id}>{ep.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading episodes...</p>
      )}
    </div>
  );
};

export default ShowPage;
