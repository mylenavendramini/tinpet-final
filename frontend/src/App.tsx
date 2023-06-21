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
  const [gotDogs, setGotDogs] = useState(false);
  const userId = contexts?.user?.id as number;
  const matches = contexts?.currentDog?.matches_dogs;
  const liked = contexts?.currentDog?.liked_dog;

  useEffect(() => {
    if (contexts?.authenticated) {
      // getTheUser();
      console.log('authenticated');
    } else {
      console.log('No dogs before login');
    }
  }, []);

  // const getTheUser = () => {
  //   apiService.getUser(userId).then((user) => {
  //     console.log({ user });
  //     contexts?.updateMyDogs(user.dogs);
  //   });
  // };

  const login = async (email: string, password: string) => {
    apiService.login(email, password).then((user) => {
      contexts?.updateUser(user);
    });
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user as string) as User;
    const userId = userObj.id as number;

    apiService.getUser(userId).then((user) => {
      contexts?.updateMyDogs(user.dogs);
    });
    if (user) {
      const { email, password } = JSON.parse(user);
      login(email, password);
      contexts?.updateAuthenticated(true);
    } else {
      console.log('You need to login first');
    }
  }, []);

  useEffect(() => {
    apiService.getDogs().then((dogs) => {
      contexts?.updateDogs([...dogs]);
      // setGotDogs(true);
    });
  }, [matches, liked]);

  return (
    <>
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
    </>
  );
};
export default App;
