import { useContext, useEffect, useState } from 'react';
import logo from '../assets/dog-face-svgrepo-com.svg';
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
  console.log(contexts?.user);
  const userId = contexts?.user?.id as number;
  console.log(userId);
  const myDogs = contexts?.myDogs;
  const matchedIds = contexts?.currentDog?.matches_dogs
  const dogs = contexts?.dogs;

  const getAllUserDogs = async () => {
    apiService.getDogsofUSer(userId).then((data) => {
      contexts?.updateMyDogs(data);
    });
  };

  const getMatches = async () => {
    console.log('called', matchedIds, contexts?.currentDog)
    const matchedDogs: Dog[] = [];
    matchedIds?.forEach((id) => {
      dogs?.map((dog) => {
        if(dog.id === id) matchedDogs.push(dog)
      })
    })
    contexts?.updateMatches(matchedDogs)
  }


  useEffect(() => {
    if (contexts?.authenticated) {
      console.log(contexts?.user);
      getAllUserDogs();
    } else {
      console.log('no users');
    }
  }, []);

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
    getMatches()
    navigate('/dashboard');
  };

  return (
    <nav>
      <div className='logo-container'>
        <img className='logo' src={logo} onClick={handleOpen} />
        {open && (
          <div className='dropdown-btns'>
            {!contexts?.authenticated ? (
              <button id='login' className='btn-nav' onClick={login}>
                Log In
              </button>
            ) : (
              <>
                <button id='logout' className='btn-nav' onClick={logout}>
                  Log Out
                </button>
                {myDogs?.map((dog, idx) => (
                  <button
                    className='btn-nav'
                    onClick={() => handleClickDog(dog)}
                    key={idx}
                  >
                    {dog.name}
                  </button>
                ))}
                <button className='btn-nav' onClick={() => navigate('/dashboard')}>
                  Start chat
                </button>
                <button
                  className='btn-nav'
                  onClick={() => navigate(`/onboarding/${userId}`)}
                >
                  Add new dog
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
