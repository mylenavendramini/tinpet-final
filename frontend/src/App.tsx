import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Login from './components/Login';
import { useEffect, useContext } from 'react';
import { Context } from './Context/Context';
import apiService from './services/apiservices';

const App = () => {
  const contexts = useContext(Context)
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    const user = localStorage.getItem('user')as unknown as User
    console.log(JSON.parse(user).username)
    if(user) {
      const{email, password} = JSON.parse(user)
      contexts?.updateAuthenticated(true);
      apiService.login(email, password).then((res) => {
        contexts?.updateUser(res)
      })
    } else {
      console.log('no users')
    }
    
  }, []);
  // useEffect(() => {
  //   const user = localStorage.getItem('user')
  //   const parsedUser =  JSON.parse(user)
  //   console.log(parsedUser.username, parsedUser.password)
  //   if (parsedUser.username) {
  //     contexts?.updateUser(parsedUser)
  //     contexts?.updateAuthenticated(true)
  //   }
  // }, [])
  // const authToken = cookies.AuthToken;
  return (
    <>
      <BrowserRouter>
        <Routes>
          {<Route path='/' element={<Home />} />}
          {<Route path='/dashboard' element={<Dashboard />} />}
          {<Route path='/onboarding/:id' element={<Onboarding />} />}
          {<Route path='/login' element={<Login />} />}
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
