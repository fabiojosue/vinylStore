import { gql } from '@apollo/client';
import client from '../config/apolloClient';

// Define GraphQL queries and mutations
const REGISTER_USER = gql`
  mutation RegisterUser($userInput: UserInput!) {
    registerUser(userInput: $userInput) {
      _id
      username
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($userInput: UserInput!) {
    loginUser(userInput: $userInput)
  }
`;

const IS_TOKEN_VALID = gql`
  query IsTokenValid($token: String!) {
    isTokenValid(token: $token)
  }
`;


interface User {
  _id?: string;
  username: string;
  password: string;
}

// Register a new user
export const registerUser = async (user: User): Promise<User> => {
  try {
    const { data } = await client.mutate({
      mutation: REGISTER_USER,
      variables: { userInput: user },
    });
    return data.registerUser;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login a user and store the token
export const loginUser = async (user: User): Promise<void> => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { userInput: user },
    });
    const token = data.loginUser;
    localStorage.setItem('jwtToken', token); // Store the token
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};
export const isTokenValid = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return false;
    }

    const { data } = await client.query({
      query: IS_TOKEN_VALID,
      variables: { token }, // Pass the token as a query variable
    });
    console.log(data);

    return data?.isTokenValid ?? false; // Handle undefined response
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};


