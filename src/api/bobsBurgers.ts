const API_BASE = 'https://bobsburgers-api.herokuapp.com';

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

  const data = (await res.json()) as T;
  cache.set(url, { timestamp: Date.now(), data });
  return data;
}

export interface Character {
  id: number;
  name: string;
  image?: string;
}

export interface Episode {
  id: number;
  name: string;
  season: number;
  episode: number;
}

export interface Quote {
  id: number;
  quote: string;
  character: string;
}

export async function getCharacter(id: number): Promise<Character> {
  return request<Character>(`/characters/${id}`);
}

interface SearchOptions {
  name?: string;
  page?: number;
  limit?: number;
}

export async function searchCharacters(options: SearchOptions = {}): Promise<Character[]> {
  const { name, page = 1, limit = 25 } = options;
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String((page - 1) * limit)
  });
  if (name) {
    params.set('name', name);
  }
  return request<Character[]>(`/characters?${params.toString()}`);
}

export async function getEpisodes(page = 1, limit = 25): Promise<Episode[]> {
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String((page - 1) * limit)
  });
  return request<Episode[]>(`/episodes?${params.toString()}`);
}

export async function getRandomQuote(): Promise<Quote> {
  const result = await request<Quote | Quote[]>(`/quotes/random`);
  return Array.isArray(result) ? result[0] : result;
}

