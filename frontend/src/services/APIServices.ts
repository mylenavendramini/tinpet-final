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
      .then((parsedRes) => parsedRes)
      .catch((error) => console.log(error));
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
      .then((parsedRes) => parsedRes)
      .catch((error) => console.log(error));
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
      .then((parsedRes) => parsedRes)
      .catch((error) => console.log(error));
  },

  getUser: async (user_id: number): Promise<User> => {
    console.log(user_id);
    return fetch(`${PORT}/user/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes)
      .catch((error) => console.log(error));
  },

  getDogs: async (): Promise<Dog[]> => {
    return fetch(`${PORT}/dogs`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes)
      .catch((error) => console.log(error));
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
      .then((parsedRes) => parsedRes)
      .catch((error) => console.log(error));
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
      .then((parsedRes) => parsedRes)
      .catch((error) => console.log(error));
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
      .then((parsedRes) => parsedRes)
      .catch((error) => console.log(error));
  },

  getMessages: async (): Promise<Message[]> => {
    return fetch(`${PORT}/messages`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((parsedRes) => parsedRes)
      .catch((error) => console.log(error));
  },
};

export default apiService;
