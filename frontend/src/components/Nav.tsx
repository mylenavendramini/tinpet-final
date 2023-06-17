/* eslint-disable react/prop-types */
import logo from '../assets/dog-face-svgrepo-com.svg';
//TODO:

const Nav = ({ setShowModal, showModal, setIsSignUp, authToken }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  // const authToken = true;
  return (
    <nav>
      <div className='logo-container'>
        <img className='logo' src={logo} />
      </div>
      {!authToken && (
        <button className='btn-nav' onClick={handleClick} disabled={showModal}>
          Log In
        </button>
      )}
    </nav>
  );
};

export default Nav;
