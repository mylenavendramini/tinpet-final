import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Login from './components/Login';
import UploadPic from './components/UploadPic';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  // const authToken = cookies.AuthToken;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          {<Route path='/dashboard' element={<Dashboard />} />}
          {<Route path='/onboarding/:id' element={<Onboarding />} />}
          {<Route path='/images' element={<UploadPic />} />}
          {<Route path='/login' element={<Login />} />}
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
