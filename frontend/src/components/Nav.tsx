import { useContext } from 'react';
//TODO:
import logo from '../assets/dog-face-svgrepo-com.svg';
import { Context } from '../Context/Context';
const Nav = () => {
  const contexts = useContext(Context);
  const handleClick = () => {
    contexts?.updateModal();
    contexts?.updateSignUp();
    contexts?.updateAuthenticated()
  };
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
          onClick={handleClick}
          disabled={contexts?.showModal}
        >
          Log In
        </button>) : (
          <button
          id='logout'
          className='btn-nav'
          onClick={handleClick}
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
