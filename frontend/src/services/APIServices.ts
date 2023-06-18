const PORT = 'http://localhost:3000/';
import { Dog, User } from '../types/Types';
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
};

export default apiService;
