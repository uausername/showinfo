export interface Show {
  id: string;
  name: string;
}

export interface Character {
  id: number;
  name: string;
  image?: string;
}

export interface Episode {
  id: number;
  name: string;
  season?: number;
  episode?: number;
}

export interface Quote {
  id: number;
  quote: string;
  character: string;
}
