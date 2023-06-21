import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
    it("renders", () => {
        render(
          <BrowserRouter>
            <Routes>
            {<Route path='/' element={<Dashboard />} />}
            </Routes>
          </BrowserRouter>
        );

}
)})