"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PORT = 'http://localhost:3000/';
// import axios from 'axios';
const apiService = {
    register: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
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
    }),
    login: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
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
    }),
    createDog: (user_id, dog) => __awaiter(void 0, void 0, void 0, function* () {
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
    }),
    getUser: (user_id) => __awaiter(void 0, void 0, void 0, function* () {
        return fetch(`${PORT}/user/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((parsedRes) => parsedRes);
    }),
    getDogs: () => __awaiter(void 0, void 0, void 0, function* () {
        return fetch(`${PORT}/dogs/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((parsedRes) => parsedRes);
    }),
    getDogsofUSer: (user_id) => __awaiter(void 0, void 0, void 0, function* () {
        return fetch(`${PORT}/dogs/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((parsedRes) => parsedRes);
    }),
    getMatches: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return fetch(`${PORT}/matches/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((parsedRes) => parsedRes);
    }),
    addMatch: (id, dog) => __awaiter(void 0, void 0, void 0, function* () {
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
    }),
    sendMessage: (id, body) => __awaiter(void 0, void 0, void 0, function* () {
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
    }),
    getMessages: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return fetch(`${PORT}/messages/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((parsedRes) => parsedRes);
    }),
    postImage: (id, formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/image/${id}`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Error uploading image');
            }
            console.log('Image uploaded successfully');
        }
        catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }),
};
exports.default = apiService;
