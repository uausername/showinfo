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
import { logMissingApi } from "../utils/missingApiLogger";
import ThreeBackground from "./ThreeBackground";

const ShowPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [reloadIndex, setReloadIndex] = useState<number>(0);
  const [alternativeSources, setAlternativeSources] =
    useState<{ label: string; url: string }[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!name) return;
      try {
        setLoading(true);
        setError(null);
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
          logMissingApi(name);
          setError("No public API available for Family Guy.");
          setAlternativeSources([
            {
              label: "IMDb",
              url: "https://www.imdb.com/title/tt0182576/"
            },
            {
              label: "TMDb",
              url: "https://www.themoviedb.org/tv/1434-family-guy"
            }
          ]);
          setEpisodes(null);
          setCharacters(null);
        } else {
          setError("Unknown show.");
        }
      } catch (e) {
        setError((e as Error).message || "Failed to load data.");
        setEpisodes(null);
        setCharacters(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [name, reloadIndex]);

  return (
    <div>
      <h2>{name}</h2>
      <ThreeBackground />
      {error && (
        <div className="banner error">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <span>{error}</span>
            <button className="btn" onClick={() => setReloadIndex((i) => i + 1)}>Retry</button>
          </div>
          {alternativeSources && (
            <p style={{ marginTop: ".5rem" }}>
              Try {""}
              {alternativeSources.map((src, idx) => (
                <span key={src.url}>
                  <a href={src.url} target="_blank" rel="noopener noreferrer">
                    {src.label}
                  </a>
                  {idx < alternativeSources.length - 1 ? " or " : ""}
                </span>
              ))}
              {" "}for more information.
            </p>
          )}
        </div>
      )}
      <ShowStats episodes={episodes} characters={characters} />
      <h3>Episodes</h3>
      {loading && !episodes && (
        <div className="card">
          <div className="skeleton line" style={{ width: "70%" }} />
          <div className="skeleton line" style={{ width: "60%" }} />
          <div className="skeleton line" style={{ width: "80%" }} />
          <div className="skeleton line" style={{ width: "50%" }} />
        </div>
      )}
      {episodes ? (
        <ul>
          {episodes.map((ep) => (
            <li key={ep.id}>{ep.name}</li>
          ))}
        </ul>
      ) : null}
      <h3>Characters</h3>
      {loading && !characters && (
        <div className="card">
          <div className="skeleton line" style={{ width: "65%" }} />
          <div className="skeleton line" style={{ width: "55%" }} />
          <div className="skeleton line" style={{ width: "75%" }} />
          <div className="skeleton line" style={{ width: "45%" }} />
        </div>
      )}
      {characters ? (
        <ul>
          {characters.map((ch) => (
            <li key={ch.id}>{ch.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default ShowPage;
