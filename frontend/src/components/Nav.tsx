import { useContext, useEffect, useState } from 'react';
import logo from '../assets/dog-face-svgrepo-com.svg';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { Dog } from '../types/Types';
import apiService from '../services/APIServices';
const Nav = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const contexts = useContext(Context);
  const userId = contexts?.user?.id as number;
  const myDogs = contexts?.myDogs;
  const matchedIds = contexts?.currentDog?.matches_dogs;
  const dogs = contexts?.dogs;

  const getMatches = () => {
    const matchedDogs: Dog[] = [];
    matchedIds?.forEach((id) => {
      dogs?.map((dog) => {
        if (dog.id === id) matchedDogs.push(dog);
      });
    });
    console.log('it came in getMatches');
  };


  const logout = () => {
    contexts?.updateModal();
    contexts?.updateSignUp(false);
    contexts?.updateAuthenticated(false);
    localStorage.clear();
    navigate('/');
  };

  const login = () => {
    navigate('/login');
  };
  const navigate = useNavigate();

  const handleClickDog = (dog: Dog) => {
    contexts?.updateCurrentDog(dog);
    getMatches();
    console.log('it came in handleclick');
    navigate(`/dashboard/${dog.id}`);
  };

  return (
    <nav>
      <div className='logo-container'>
        <img className='logo' src={logo} onClick={handleOpen} />
        {open && (
          <div className='dropdown-btns'>
            <button className='btn-nav' onClick={() => navigate('/')}>
              <HomeIcon />
              <span>Home</span>
            </button>
            {!contexts?.authenticated ? (
              <button id='login' className='btn-nav blue' onClick={login}>
                Log In
              </button>
            ) : (
              <>
                {myDogs?.map((dog, idx) => (
                  <button
                    className='btn-nav'
                    onClick={() => handleClickDog(dog)}
                    key={idx}
                  >
                    <PetsIcon />
                    <span>{dog.name}</span>
                  </button>
                ))}
                <button
                  className='btn-nav'
                  onClick={() => navigate(`/onboarding/${userId}`)}
                >
                  <AddCircleIcon />
                  <span>Add new dog</span>
                </button>
                <button id='logout' className='btn-nav blue' onClick={logout}>
                  Log Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
export default Nav;
