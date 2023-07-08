import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dog, User } from './types/Types';
import Login from './components/Login';
import { useEffect, useContext, useState } from 'react';
import { Context } from './Context/Context';
import apiService from './services/APIServices';
import AuthModal from './components/Register';
import MyDogs from './components/MyDogs';

const App = () => {
  const contexts = useContext(Context);
  const currentDog = contexts?.currentDog;
  const matches = contexts?.currentDog?.matches_dogs;
  const liked = contexts?.currentDog?.liked_dog;

  const login = async (email: string, password: string) => {
    apiService.login(email, password).then((user) => {
      contexts?.updateUser(user);
    });
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const { id } = JSON.parse(user);
      apiService.getUser(id).then((user) => {
        console.log(user);
        contexts?.updateMyDogs(user.dogs);
      });
    }
  }, [contexts?.authenticated]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const { email, password, id } = JSON.parse(user);
      login(email, password).then((data) => {
        contexts?.updateAuthenticated(true);
      });
    } else {
      console.log('You need to login first');
    }
  }, []);

  useEffect(() => {
    apiService.getDogs().then((dogs) => {
      contexts?.updateDogs([...dogs]);
    });
  }, [matches, liked]);

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          {<Route path='/' element={<Home />} />}
          {<Route path='/myDogs' element={<MyDogs />} />}
          {<Route path='/dashboard/:id' element={<Dashboard />} />}
          {<Route path='/onboarding/:id' element={<Onboarding />} />}
          {<Route path='/login' element={<Login />} />}
          {<Route path='/register' element={<AuthModal />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
