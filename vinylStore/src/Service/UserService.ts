import axios from 'axios';

const baseUrl = 'http://localhost:8080/users'; // Adjust the base URL as needed

interface User {
  _id?: string;
  username: string;
  password: string;
}

// Register a new user
export const registerUser = async (user: User): Promise<User> => {
  const response = await axios.post(`${baseUrl}/register`, user);
  return response.data;
};

// Login a user
export const loginUser = async (user: User): Promise<string> => {
  const response = await axios.post(`${baseUrl}/login`, user);
  return response.data;
};
