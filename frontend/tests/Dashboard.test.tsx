import { describe, it, expect , vi} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useContext } from 'react';
import { useParams } from 'react-router';
import Dashboard from '../src/pages/Dashboard';
import apiService from '../src/services/APIServices';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react'


// describe('Renders main page correctly', async () => {
//     it('Should render the page correctly', async () => {
//         expect(true).toBeTruthy();
//     });
// });

describe('Dashboard', () => {
    it("Renders component correctly", () => {
        render(<Dashboard />);
        // const userProfile = screen.getByTestId('user-profile');
        // expect(userProfile).toBeDefined()
}
)})