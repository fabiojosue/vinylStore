import { gql } from '@apollo/client';
import client from '../config/apolloClient';
import { Artist } from '../Interfaces/Interfaces';

// Create a new artist
export const createArtist = async (artist: Artist): Promise<Artist> => {
    const CREATE_ARTIST = gql`
      mutation CreateArtist($artistInput: ArtistInput!) {
        createArtist(artistInput: $artistInput) {
          _id
          name
          biography
          imageURL
        }
      }
    `;
  
    const { data } = await client.mutate({
      mutation: CREATE_ARTIST,
      variables: { artistInput: artist },
    });
  
    return data.createArtist;
  };

// Get all artists
export const getArtists = async (): Promise<Artist[]> => {
  const GET_ALL_ARTISTS = gql`
    query GetAllArtists {
      getAllArtists {
        _id
        name
        biography
        imageURL
      }
    }
  `;

  const { data } = await client.query({ query: GET_ALL_ARTISTS });
  return data.getAllArtists;
};

// Get an artist by ID
export const getArtistById = async (id: string): Promise<Artist> => {
  const GET_ARTIST_BY_ID = gql`
    query GetArtistById($_id: ID!) {
      getArtistById(_id: $_id) {
        _id
        name
        biography
        imageURL
      }
    }
  `;

  const { data } = await client.query({
    query: GET_ARTIST_BY_ID,
    variables: { _id: id },
  });

  return data.getArtistById;
};

// Update an artist by ID
export const updateArtist = async (id: string, updates: Partial<Artist>): Promise<Artist> => {
  const UPDATE_ARTIST = gql`
    mutation UpdateArtist($id: ID!, $artistInput: ArtistInput!) {
      updateArtist(id: $id, artistInput: $artistInput) {
        _id
        name
        biography
        imageURL
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: UPDATE_ARTIST,
    variables: { id, artistInput: updates },
  });

  return data.updateArtist;
};

// Delete an artist by ID
export const deleteArtist = async (id: string): Promise<void> => {
  const DELETE_ARTIST = gql`
    mutation DeleteArtist($id: ID!) {
      deleteArtist(id: $id)
    }
  `;

  await client.mutate({
    mutation: DELETE_ARTIST,
    variables: { id },
  });
};

// Validate if artist is being used in a record
export const validateArtist = async (id: string): Promise<any> => {
  const IS_ARTIST_USED = gql`
    mutation IsArtistUsed($id: ID!) {
      isArtistUsed(id: $id)
    }
  `;

  const { data } = await client.mutate({
    mutation: IS_ARTIST_USED,
    variables: { id },
  });

  return data.isArtistUsed;
};
