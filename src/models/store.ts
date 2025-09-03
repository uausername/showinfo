import { Character, Episode, Quote } from './index';

function key(show: string, id: number): string {
  return `${show}:${id}`;
}

const characterStore = new Map<string, Character>();
const episodeStore = new Map<string, Episode>();
const quoteStore = new Map<string, Quote>();

export function putCharacter(show: string, character: Character): void {
  characterStore.set(key(show, character.id), character);
}

export function getCharacter(show: string, id: number): Character | undefined {
  return characterStore.get(key(show, id));
}

export function putEpisode(show: string, episode: Episode): void {
  episodeStore.set(key(show, episode.id), episode);
}

export function getEpisode(show: string, id: number): Episode | undefined {
  return episodeStore.get(key(show, id));
}

export function putQuote(show: string, quote: Quote): void {
  quoteStore.set(key(show, quote.id), quote);
}

export function getQuote(show: string, id: number): Quote | undefined {
  return quoteStore.get(key(show, id));
}
