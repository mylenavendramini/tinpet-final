import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dog } from './types/Types';
import Login from './components/Login';
import { useEffect, useContext, useState } from 'react';
import { Context } from './Context/Context';
import apiService from './services/APIServices';
import AuthModal from './components/AuthModal';
import MyDogs from './components/Mydogs';

const App = () => {
  const contexts = useContext(Context);
  const [gotDogs, setGotDogs] = useState(false);
  const userId = contexts?.user?.id as number;

  const getAllTheDogs = async () => {
    apiService.getDogsofUSer(userId).then((data) => {
      contexts?.updateMyDogs(data);
      // if (data.length > 0) {
      //   contexts?.updateCurrentDog(data[0]);
      // }
      // setGotDogs(true);
      console.log('APP REFETCHED')
    });
  };

  const login = async (email: string, password: string) => {
    apiService.login(email, password).then((res) => {
      contexts?.updateUser(res);
    });
  };

  useEffect(() => {
    if (contexts?.authenticated) {
      getAllTheDogs();
    } else {
      console.log('no users');
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const { email, password } = JSON.parse(user);
      login(email, password);
      contexts?.updateAuthenticated(true);
    } else {
      console.log('no users');
    }
  }, []);

  useEffect(() => {
    apiService.getDogs().then((data) => {
      contexts?.updateDogs(data);
      setGotDogs(true);
    });
  }, []);

  // console.log(contexts?.myDogs, 'here');
  

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
