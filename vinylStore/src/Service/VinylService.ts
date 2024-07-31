// src/services/vinylService.ts
import axios from 'axios';

const baseUrl = 'http://localhost:8080/vinyls'; // Adjust the base URL as needed


interface Artist {
  _id: string;
  name: string;
}

interface Vinyl {
  _id?: string;
  title: string;
  artist: Artist | string;
  coverImage: string;
  price: number;
}

// Create a new vinyl record
export const createVinyl = async (vinyl: Vinyl): Promise<Vinyl> => {
  const response = await axios.post(baseUrl, vinyl);
  return response.data;
};

// Get all vinyl records
export const getVinyls = async (): Promise<Vinyl[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// Get a vinyl record by ID
export const getVinylById = async (id: string): Promise<Vinyl> => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

// Update a vinyl record by ID
export const updateVinyl = async (id: string, updates: Partial<Vinyl>): Promise<Vinyl> => {
  const response = await axios.patch(`${baseUrl}/${id}`, updates);
  return response.data;
};

// Delete a vinyl record by ID
export const deleteVinyl = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`);
};
