import logo from '../../public/tinder-icon.svg';

const Nav = ({ authToken, setShowModal, showModal }) => {
  const handleClick = () => {
    setShowModal(true);
  };

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
