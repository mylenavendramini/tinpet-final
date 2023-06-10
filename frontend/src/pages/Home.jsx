import { useState } from 'react';
import AuthModal from '../components/AuthModal';
import Nav from '../components/Nav';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const authToken = false;

  const handleClick = () => {
    console.log('Click!!');
    setShowModal(true);
  };

  return (
    <>
      <div className='overlay'>
        <Nav authToken={authToken} setShowModal={setShowModal} showModal={showModal}/>
        <div className='home'>
          <h1>Swipe Right</h1>
          <button
            className='btn-primary'
            onClick={handleClick}
          >
            {authToken ? 'Sign Out' : 'Create Account'}
          </button>

          {showModal && <AuthModal setShowModal={setShowModal} />}
        </div>
      </div>
    </>
  );
};

export default Home;
