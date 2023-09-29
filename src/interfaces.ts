export type nextPage = string | null;

export interface Page {
  count: number;
  next: string;
  previous: null;
  results: Tutorial[];
}
export interface Tutorial {
  id: number;
  name: string;
  audios: Audio[];
  language: Playlist | null; //!Inserire questo tipo
  playlists: Playlist[] | null;
}

export interface Audio {
  url: string;
  analysis: Analysis;
  speaker: Speaker;
  id: string;
}

export interface Analysis {
  data: Data;
}

export interface Data {
  hop: string;
  text: string;
  unit: Unit;
  max_x: number;
  max_y: string;
  min_y: string;
  samples: Array<number | null>;
  silence: string;
  histogram: string;
  tolerance: string;
  samplerate: string;
}

export enum Unit {
  MIDI = "midi",
}

export interface Speaker {
  name: string | null;
  code: string;
}

export interface Playlist {
  id: number;
  name: string;
  tutorial_count: number;
}

export interface Language {
  id: number;
  name: string;
  tutorial_count: number;
}
