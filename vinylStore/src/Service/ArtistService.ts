import axios from 'axios';
import { Artist } from '../Interfaces/Interfaces';

const baseUrl = 'http://localhost:8080/artists'; // Adjust the base URL as needed


// Create a new artist
export const createArtist = async (artist: Artist): Promise<Artist> => {
  const response = await axios.post(baseUrl, artist);
  return response.data;
};

// Get all artists
export const getArtists = async (): Promise<Artist[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// Get an artist by ID
export const getArtistById = async (id: string): Promise<Artist> => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

// Update an artist by ID
export const updateArtist = async (id: string, updates: Partial<Artist>): Promise<Artist> => {
  const response = await axios.patch(`${baseUrl}/${id}`, updates);
  return response.data;
};

// Delete an artist by ID
export const deleteArtist = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`);
};

//Validate if artist is being used in a record
export const validateArtist = async (id: string): Promise<boolean> => {
  const response = await axios.get(`${baseUrl}/used/${id}`);
  return response.data;
}
