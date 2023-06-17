import { useContext } from 'react';
//TODO:
import logo from '../assets/dog-face-svgrepo-com.svg';
import { Context } from '../Context/Context';
const Nav = () => {
  const contexts = useContext(Context);
  const handleClick = () => {
    contexts?.updateModal();
    contexts?.updateSignUp();
  };
  // const authToken = true;
  return (
    <nav>
      <div className='logo-container'>
        <img className='logo' src={logo} />
      </div>
      {
        <button
          className='btn-nav'
          onClick={handleClick}
          disabled={contexts?.showModal}
        >
          Log In
        </button>
      }
    </nav>
  );
};
export default Nav;
