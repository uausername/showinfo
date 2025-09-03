import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getEpisodes as getSouthParkEpisodes,
  getCharacters as getSouthParkCharacters
} from "../api/southPark";
import {
  getEpisodes as getBobsBurgersEpisodes,
  getCharacters as getBobsBurgersCharacters
} from "../api/bobsBurgers";
import {
  normalizeSouthParkEpisode,
  normalizeBobsBurgersEpisode,
  normalizeSouthParkCharacter,
  normalizeBobsBurgersCharacter
} from "../models/normalizers";
import { Episode, Character } from "../models";
import ShowStats from "./ShowStats";

const ShowPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!name) return;
      try {
        if (name === "south-park") {
          const [eps, chars] = await Promise.all([
            getSouthParkEpisodes(),
            getSouthParkCharacters()
          ]);
          setEpisodes(eps.map(normalizeSouthParkEpisode));
          setCharacters(chars.map(normalizeSouthParkCharacter));
        } else if (name === "bobs-burgers") {
          const [eps, chars] = await Promise.all([
            getBobsBurgersEpisodes(),
            getBobsBurgersCharacters()
          ]);
          setEpisodes(eps.map(normalizeBobsBurgersEpisode));
          setCharacters(chars.map(normalizeBobsBurgersCharacter));
        } else if (name === "family-guy") {
          setError("No public API available for Family Guy.");
        } else {
          setError("Unknown show.");
        }
      } catch (e) {
        setError((e as Error).message);
      }
    }

    fetchData();
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
      <ShowStats episodes={episodes} characters={characters} />
      <h3>Episodes</h3>
      {episodes ? (
        <ul>
          {episodes.map((ep) => (
            <li key={ep.id}>{ep.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading episodes...</p>
      )}
      <h3>Characters</h3>
      {characters ? (
        <ul>
          {characters.map((ch) => (
            <li key={ch.id}>{ch.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading characters...</p>
      )}
    </div>
  );
};

export default ShowPage;
