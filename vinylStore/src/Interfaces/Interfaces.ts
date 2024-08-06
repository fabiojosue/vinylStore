export interface Artist {
    _id?: string;
    name: string;
    imageURL: string;
    biography: string;
  }
  
  export interface Vinyl {
    _id?: string;
    title: string;
    artist: string;
    artistFetched : Artist;
    coverImage: string;
    price: number;
  }
  