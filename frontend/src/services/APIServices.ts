const PORT = 'http://localhost:3001';
import { Dog, User, Message } from '../types/Types';

const apiService = {
  register: async (username: string, email: string, password: string) => {
    return fetch(`${PORT}/user`, {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
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

  getDogsofUser: async (user_id: number): Promise<Dog[]> => {
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

  addMatch: async (myDog: Dog, otherDogId: number) => {
    return fetch(`${PORT}/dogs/${otherDogId}`, {
      method: 'PUT',
      body: JSON.stringify(myDog),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes);
  },

  sendMessage: async (senderId: number, body: Message): Promise<Message> => {
    return fetch(`${PORT}/messages/${senderId}`, {
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

  getMessages: async (currentId: number): Promise<Message[]> => {
    return fetch(`${PORT}/messages/${currentId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes);
  },
};

export default apiService;
