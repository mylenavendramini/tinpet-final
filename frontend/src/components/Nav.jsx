import logo from '../assets/icon.svg';

const Nav = ({ setShowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  const authToken = true;
  return (
    <nav>
      <div className='logo-container'>
        <img
          className='logo'
          src={logo}
        />
      </div>
      {!authToken && (
        <button
          className='btn-nav'
          onClick={handleClick}
          disabled={showModal}
        >
          Log In
        </button>
      )}
    </nav>
  );
};

export default Nav;
