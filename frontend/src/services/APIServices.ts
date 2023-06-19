const PORT = 'http://localhost:3000/';
import { Dog, User, Message } from '../types/Types';
// import axios from 'axios';
const apiService = {
  register: async (email: string, password: string) => {
    return fetch(`${PORT}/user`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes);
  },

  login: async (email: string, password: string) => {
    return fetch(`${PORT}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes);
  },

  createDog: async (user_id: number, dog: Dog): Promise<Dog> => {
    return fetch(`${PORT}/dogs/${user_id}`, {
      method: 'POST',
      body: JSON.stringify(dog),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes);
  },

  getUser: async (user_id: number): Promise<User> => {
    return fetch(`${PORT}/user/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes);
  },
  getDogs: async (): Promise<Dog[]> => {
    return fetch(`${PORT}/dogs/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes);
  },

  getDogsofUSer: async (user_id: number): Promise<Dog[]> => {
    return fetch(`${PORT}/dogs/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes);
  },

  getMatches: async (id: number) => {
    return fetch(`${PORT}/matches/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes);
  },

  addMatch: async (id: number, dog: Dog) => {
    return fetch(`${PORT}/dogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dog),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes);
  },

  sendMessage: async (id: number, body: Message): Promise<Message> => {
    return fetch(`${PORT}/messages/${id}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes);
  },

  getMessages: async (id: number): Promise<Message[]> => {
    return fetch(`${PORT}/messages/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes);
  },




 postImage: async (id: number, formData: FormData): Promise<void> => {
  try {
    const response = await fetch(`/image/${id}`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Error uploading image');
    }
    console.log('Image uploaded successfully');
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
 },
};






export default apiService;
