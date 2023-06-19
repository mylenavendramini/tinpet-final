import { useContext, useEffect, useState } from 'react';
import { User } from '../types/Types';
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
  const myDogs = contexts?.myDogs;

  const getAllTheDogs = async () => {
    apiService
      .getDogsofUSer(userId)
      .then((data) => {
        contexts?.updateMyDogs(data);
      });
  };

  useEffect(() => {
    const user = localStorage.getItem('user')as unknown as User
    console.log(JSON.parse(user))
    if(user) {
      contexts?.updateAuthenticated();
      contexts?.updateUser(user)
      getAllTheDogs();
    } else {
      console.log('no users')
    }
    
  }, []);

  const logout = () => {
    contexts?.updateModal();
    contexts?.updateSignUp();
    contexts?.updateAuthenticated();
    localStorage.clear()
  };
  console.log(contexts?.user!.id)

  const login = () => {
    navigate('/login');
  };
  const navigate = useNavigate();

  const handleClickDog = (dog: Dog) => {
    contexts?.updateCurrentDog(dog);
    navigate('/dashboard');
  };

  console.log(contexts?.authenticated )

  // const authToken = true;
  return (
    <nav>
      <div className='logo-container'>
        <img className='logo' src={logo} onClick={handleOpen} />
        {open && (
          <div className='dropdown-btns'>
            {contexts?.authenticated ? (
              <button id='login' className='btn-nav' onClick={login}>
                Log In
              </button>
            ) : (
              <button
                id='logout'
                className='btn-nav'
                onClick={logout}
                disabled={contexts?.showModal}
              >
                Log Out
              </button>
            )}
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
          </div>
        )}
      </div>

      {/*contexts?.authenticated ? (
        <button id='login' className='btn-nav' onClick={login}>
          Log In
        </button>
      ) : (
        <button
          id='logout'
          className='btn-nav'
          onClick={logout}
          disabled={contexts?.showModal}
        >
          Log Out
        </button>
      )*/}
    </nav>
  );
};
export default Nav;
