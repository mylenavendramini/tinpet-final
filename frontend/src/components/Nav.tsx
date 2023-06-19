import { useContext, useState } from 'react';
import logo from '../assets/dog-face-svgrepo-com.svg';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { Dog } from '../types/Types';
const Nav = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const contexts = useContext(Context);
  const myDogs = contexts?.myDogs;
  const logout = () => {
    contexts?.updateModal();
    contexts?.updateSignUp();
    contexts?.updateAuthenticated();
  };

  const login = () => {
    navigate('/login');
  };
  const navigate = useNavigate();

  const handleClickDog = (dogId: number) => {
    setCurrentDog(dogId);
  };

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
            {myDogs?.map((dog) => (
              <button
                className='btn-nav'
                onClick={() => handleClickDog(dog.id)}
              >
                {dog.name}
              </button>
            ))}
            <button className='btn-nav' onClick={() => navigate('/dashboard')}>
              Start chat
            </button>
            <button className='btn-nav' onClick={() => navigate('/onboarding')}>
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
