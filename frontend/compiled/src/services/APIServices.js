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
    getMatches: () => __awaiter(void 0, void 0, void 0, function* () {
        return fetch(`${PORT}/matches`, {
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
};
exports.default = apiService;
