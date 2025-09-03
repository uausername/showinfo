const API_BASE = 'https://spapi.dev/api';

/** Basic cache entry */
interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

const cache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export class RateLimitError extends Error {
  constructor(message = 'Rate limit exceeded') {
    super(message);
    this.name = 'RateLimitError';
  }
}

export class DataNotFoundError extends Error {
  constructor(message = 'Data not found') {
    super(message);
    this.name = 'DataNotFoundError';
  }
}

interface ApiResponse<T> {
  data: T;
}

async function request<T>(path: string): Promise<T> {
  const url = `${API_BASE}${path}`;
  const cached = cache.get(url) as CacheEntry<T> | undefined;
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const res = await fetch(url);
  if (res.status === 429) {
    throw new RateLimitError();
  }
  if (res.status === 404) {
    throw new DataNotFoundError();
  }
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const body = (await res.json()) as ApiResponse<T> | undefined;
  if (!body || body.data == null) {
    throw new DataNotFoundError('Missing data in response');
  }
  const data = body.data;
  cache.set(url, { timestamp: Date.now(), data });
  return data;
}

export interface Character {
  id: number;
  name: string;
  age: number | null;
  sex: string | null;
  hair_color: string | null;
  occupation: string | null;
}

export interface Episode {
  id: number;
  name: string;
  season: number;
  episode: number;
  air_date: string;
}

export interface Location {
  id: number;
  name: string;
}

export interface Quote {
  id: number;
  quote: string;
  character: string;
}

export async function getCharacter(id: number): Promise<Character> {
  return request<Character>(`/characters/${id}`);
}

export async function getCharacters(): Promise<Character[]> {
  return request<Character[]>(`/characters`);
}

export async function getEpisodes(): Promise<Episode[]> {
  return request<Episode[]>('/episodes');
}

export async function getLocations(): Promise<Location[]> {
  return request<Location[]>('/locations');
}

export async function getQuotes(): Promise<Quote[]> {
  return request<Quote[]>('/quotes');
}

