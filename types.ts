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

export enum GeneratorMode {
  LYRICS = 'LYRICS',
  PRODUCTION_TIPS = 'PRODUCTION_TIPS',
  NAME_GENERATOR = 'NAME_GENERATOR'
}