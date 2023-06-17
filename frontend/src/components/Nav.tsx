import { useContext } from 'react';
import logo from '../assets/dog-face-svgrepo-com.svg';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
const Nav = () => {
  const contexts = useContext(Context);
  const logout = () => {
    contexts?.updateModal();
    contexts?.updateSignUp();
    contexts?.updateAuthenticated()
  };

  const login = () => {
    navigate('/login')
  }
  const navigate = useNavigate();
  
  // const authToken = true;
  return (
    <nav>
      <div className='logo-container'>
        <img className='logo' src={logo} />
      </div>
      {contexts?.authenticated?
        (<button
          id='login'
          className='btn-nav'
          onClick={login}
        >
          Log In
        </button>) : (
          <button
          id='logout'
          className='btn-nav'
          onClick={logout}
          disabled={contexts?.showModal}
        >
          Log Out
        </button>
        )
      }
    </nav>
  );
};
export default Nav;
