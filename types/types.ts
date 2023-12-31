export interface MoviesItemProps {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  genres: string;
  genre_ids: number[];
  index: number;
  isLoading: boolean;
  toggleFavorite: (movieId: number) => void;
  isFavorite?: boolean; // Propiedad opcional
}

export interface SeriesItemsProps {
  id: number;
  original_name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genres: string;
  genre_ids: number[];
  index: number;
  isLoading: boolean;
}

export interface MoviesItems {
  params: {
    id: string;
  };
}

export interface SeriesItems {
  params: {
    id: string;
  };
}

export interface MovieItemContainerProps {
  movie: MoviesItemProps;
}

export interface SerieItemContainerProps {
  serie: SeriesItemsProps;
}