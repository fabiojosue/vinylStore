export interface Artist {
    _id: string;
    name: string;
  }
  
  export interface Vinyl {
    _id: string;
    title: string;
    artist: string;
    artistFetched : Artist;
    coverImage: string;
    price: number;
  }
  