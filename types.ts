import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  price: string;
}

export interface SongIdea {
  title: string;
  lyrics: string;
  genre: string;
  mood: string;
}

export interface SongDraft {
  id: string;
  title: string;
  style: string;
  mood: string;
  lyrics: string;
  chords: string;
  description: string;
  createdAt: number;
}

export enum GeneratorMode {
  LYRICS = 'LYRICS',
  PRODUCTION_TIPS = 'PRODUCTION_TIPS',
  NAME_GENERATOR = 'NAME_GENERATOR',
  SONG_COMPOSER = 'SONG_COMPOSER'
}