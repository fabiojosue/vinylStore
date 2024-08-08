import { gql } from '@apollo/client';
import client from '../config/apolloClient';
import { Vinyl } from '../Interfaces/Interfaces';

// Create a new vinyl record
export const createVinyl = async (vinyl: Omit<Vinyl, '_id'>): Promise<Vinyl> => {
  const CREATE_VINYL = gql`
    mutation CreateVinyl($vinylInput: VinylInput!) {
      createVinyl(vinylInput: $vinylInput) {
        _id
        title
        coverImage
        artist
        price
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: CREATE_VINYL,
    variables: { vinylInput: vinyl },
  });

  return data.createVinyl;
};

// Get all vinyl records
export const getVinyls = async (): Promise<Vinyl[]> => {
  const GET_ALL_VINYLS = gql`
    query GetAllVinyls {
      getAllVinyls {
        _id
        title
        coverImage
        artist
        price
        artistFetched {
            _id
            name
            biography
            imageURL
        }
      }
    }
  `;

  const { data } = await client.query({ query: GET_ALL_VINYLS });
  return data.getAllVinyls;
};

// Get a vinyl record by ID
export const getVinylById = async (id: string): Promise<Vinyl> => {
  const GET_VINYL_BY_ID = gql`
    query GetVinylById($id: ID!) {
      getVinylById(id: $id) {
        _id
        title
        coverImage
        artist
        price
      }
    }
  `;

  const { data } = await client.query({
    query: GET_VINYL_BY_ID,
    variables: { id },
  });

  return data.getVinylById;
};

// Update a vinyl record by ID
export const updateVinyl = async (id: string, updates: Partial<Omit<Vinyl, '_id'>>): Promise<Vinyl> => {
  const UPDATE_VINYL = gql`
    mutation UpdateVinyl($id: ID!, $vinylInput: VinylInput!) {
      updateVinyl(id: $id, vinylInput: $vinylInput) {
        _id
        title
        coverImage
        artist
        price
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: UPDATE_VINYL,
    variables: { id, vinylInput: updates },
  });

  return data.updateVinyl;
};

// Delete a vinyl record by ID
export const deleteVinyl = async (id: string): Promise<void> => {
  const DELETE_VINYL = gql`
    mutation DeleteVinyl($id: ID!) {
      deleteVinyl(id: $id)
    }
  `;

  await client.mutate({
    mutation: DELETE_VINYL,
    variables: { id },
  });
};
