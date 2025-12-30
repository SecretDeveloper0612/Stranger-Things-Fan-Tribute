
export interface Season {
  id: number;
  year: string;
  theme: string;
  description: string;
  imageUrl: string;
}

export interface Character {
  name: string;
  quote: string;
  arc: string;
  imageUrl: string;
  color: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
}

export interface Location {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  significance: string;
}
