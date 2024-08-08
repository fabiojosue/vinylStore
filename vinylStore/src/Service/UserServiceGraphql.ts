import { gql } from '@apollo/client';
import client from '../config/apolloClient';

interface User {
  _id?: string;
  username: string;
  password: string;
}

// GraphQL mutations
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

// Login a user
export const loginUser = async (user: User): Promise<string> => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { userInput: user },
    });
    return data.loginUser;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};
