import { Character as SPCharacter, Episode as SPEpisode, Quote as SPQuote } from '../api/southPark';
import { Character as BBCharacter, Episode as BBEpisode, Quote as BBQuote } from '../api/bobsBurgers';
import { Character, Episode, Quote } from './index';

export function normalizeSouthParkCharacter(character: SPCharacter): Character {
  return { id: character.id, name: character.name };
}

export function normalizeBobsBurgersCharacter(character: BBCharacter): Character {
  return { id: character.id, name: character.name, image: character.image };
}

export function normalizeSouthParkEpisode(episode: SPEpisode): Episode {
  return {
    id: episode.id,
    name: episode.name,
    season: episode.season,
    episode: episode.episode
  };
}

export function normalizeBobsBurgersEpisode(episode: BBEpisode): Episode {
  return {
    id: episode.id,
    name: episode.name,
    season: episode.season,
    episode: episode.episode
  };
}

export function normalizeSouthParkQuote(quote: SPQuote): Quote {
  return { id: quote.id, quote: quote.quote, character: quote.character };
}

export function normalizeBobsBurgersQuote(quote: BBQuote): Quote {
  return { id: quote.id, quote: quote.quote, character: quote.character };
}
